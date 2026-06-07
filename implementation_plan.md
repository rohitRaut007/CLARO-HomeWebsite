# Claro Backend Architecture & Implementation Plan

This document outlines the complete production-grade backend architecture, integrations, APIs, database schema, authentication flow, AI orchestration logic, encryption layer, and deployment setup for the **Claro** platform.

## User Review Required
> [!IMPORTANT]
> This plan covers the entire technical architecture. Please review the **Encryption Architecture (Zero-Knowledge)** and the **Prisma Schema** closely to ensure it aligns with your security requirements and data model expectations.

---

## 1. Architecture Overview

Claro is a privacy-first, stateful AI reflection system built on a modern serverless stack. The architecture is designed to ensure maximum user privacy (zero-knowledge for thought data), low-latency streaming responses, and reliable state management.

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS, shadcn/ui, Framer Motion.
- **Backend/API**: Next.js Server Actions and Edge Route Handlers.
- **Database**: Supabase PostgreSQL with Row Level Security (RLS).
- **ORM**: Prisma ORM.
- **Authentication**: Supabase Auth (Email/Password, Google OAuth, Magic Links).
- **AI Orchestration**: LangChain.js + OpenAI API (GPT-4o / GPT-4o-mini).
- **Memory/Cache**: Redis (Upstash) for fast session retrieval, rate limiting, and typing state.
- **Deployment**: Vercel (Edge Functions for streaming, Serverless Functions for heavy data operations).

---

## 2. Folder Structure

```text
inner-clarity/
├── prisma/
│   ├── schema.prisma         # Database schema models
│   └── migrations/           # Database migrations
├── src/
│   ├── app/                  # Next.js 15 App Router pages & API routes
│   │   ├── (auth)/           # Login, signup, callback routes
│   │   ├── (dashboard)/      # Dashboard, history, settings
│   │   ├── session/          # Active reflection session UI
│   │   ├── api/              # Route handlers (webhooks, streaming edge APIs)
│   │   │   └── chat/         # Streaming AI endpoint
│   │   └── layout.tsx
│   ├── actions/              # Server Actions (mutations, safe data fetching)
│   ├── components/           # UI components (shadcn/ui, custom Claro components)
│   ├── lib/
│   │   ├── ai/               # AI orchestration, LangChain chains, tools
│   │   │   ├── prompts.ts    # System, safety, tone prompts
│   │   │   └── orchestrator.ts
│   │   ├── db/               # Prisma client instantiation
│   │   ├── encryption/       # Client/Server encryption utils (AES-GCM, RSA)
│   │   ├── supabase/         # Supabase client (browser, server, middleware)
│   │   └── redis/            # Upstash Redis client
│   └── types/                # TypeScript type definitions
├── .env                      # Local environment variables
└── vercel.json               # Vercel deployment configuration
```

---

## 3. Database Schema Overview

The database leverages Supabase PostgreSQL with Prisma as the ORM.
All sensitive text fields (thoughts, messages, reflections) are stored as encrypted blobs. The server does not hold the keys; keys are derived from the user's password/auth token and stored securely in the client session memory.

**Key Tables:**
- `User`: Base profile, auth mapping.
- `EncryptedUserData`: Stores the user's encrypted private key.
- `Session`: A reflection session instance.
- `Thought`: The initial trigger or thought for a session (Encrypted).
- `ConversationMessage`: Individual messages in a session (Encrypted).
- `AIReflection`: AI analysis of a message (hidden from user, encrypted).
- `InquiryLevel`: Global definitions of the 5 depth levels.
- `InquiryQuestion`: Question templates/embeddings.
- `EmotionalProfile`: Tracked emotional states over time (Encrypted/Anonymized).
- `BiasPattern`: Identified cognitive biases in a session.
- `SessionSummary`: High-level summary of a completed session (Encrypted).
- `AIStateMemory`: Redis-backed or DB-backed rolling context window.

---

## 4. Prisma Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

enum Role {
  USER
  CLARO
}

enum BiasType {
  SUNK_COST
  CONFIRMATION
  AVOIDANCE
  PERFECTIONISM
  URGENCY_ADDICTION
  SELF_SABOTAGE
}

enum InquiryDepth {
  SURFACE_EMOTION
  SITUATION_ANATOMY
  PATTERN_DETECTION
  IDENTITY_FRICTION
  RESOLUTION_CLARITY
}

model User {
  id                 String             @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  supabaseAuthId     String             @unique
  email              String             @unique
  createdAt          DateTime           @default(now())
  updatedAt          DateTime           @updatedAt
  deletedAt          DateTime?          // Soft delete
  
  encryptedData      EncryptedUserData?
  sessions           Session[]
  emotionalProfiles  EmotionalProfile[]
}

model EncryptedUserData {
  id                String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  userId            String   @unique @db.Uuid
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  encryptedSalt     String   // Salt for deriving AES key from password
  encryptedKeyVault String   // The user's symmetric key, encrypted with their password hash
  updatedAt         DateTime @updatedAt
}

model Session {
  id                String               @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  userId            String               @db.Uuid
  user              User                 @relation(fields: [userId], references: [id], onDelete: Cascade)
  status            String               @default("ACTIVE") // ACTIVE, COMPLETED, ABANDONED
  currentDepth      InquiryDepth         @default(SURFACE_EMOTION)
  createdAt         DateTime             @default(now())
  updatedAt         DateTime             @updatedAt
  deletedAt         DateTime?
  
  thought           Thought?
  messages          ConversationMessage[]
  biasPatterns      BiasPattern[]
  summary           SessionSummary?
  aiMemory          AIStateMemory?
}

model Thought {
  id                String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  sessionId         String   @unique @db.Uuid
  session           Session  @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  encryptedContent  String   // Client-side AES-GCM encrypted
  iv                String   // Initialization vector
  createdAt         DateTime @default(now())
}

model ConversationMessage {
  id                String         @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  sessionId         String         @db.Uuid
  session           Session        @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  role              Role
  encryptedContent  String         
  iv                String
  createdAt         DateTime       @default(now())

  aiReflection      AIReflection?
}

model AIReflection {
  id                String               @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  messageId         String               @unique @db.Uuid
  message           ConversationMessage  @relation(fields: [messageId], references: [id], onDelete: Cascade)
  encryptedAnalysis String               // AI's internal scratchpad (encrypted)
  detectedEmotion   String?              // Broad category for UI tinting (e.g., 'anxious', 'calm')
  createdAt         DateTime             @default(now())
}

model BiasPattern {
  id                String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  sessionId         String   @db.Uuid
  session           Session  @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  biasType          BiasType
  confidence        Float
  createdAt         DateTime @default(now())
}

model SessionSummary {
  id                String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  sessionId         String   @unique @db.Uuid
  session           Session  @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  encryptedSummary  String
  iv                String
  createdAt         DateTime @default(now())
}

model EmotionalProfile {
  id                String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  userId            String   @db.Uuid
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  encryptedData     String   // Aggregated insights (encrypted)
  createdAt         DateTime @default(now())
}

model AIStateMemory {
  id                String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  sessionId         String   @unique @db.Uuid
  session           Session  @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  encryptedContext  String   // Summarized running memory context
  updatedAt         DateTime @updatedAt
}
```

---

## 5. Supabase Setup & RLS

1. **Authentication**: Supabase Auth configured with Email/Password and Google OAuth.
2. **Row Level Security (RLS)**:
   - Users can only `SELECT`, `INSERT`, `UPDATE` rows where `user_id = auth.uid()`.
   - Sessions and Messages verify ownership via joining to `User` table matching `auth.uid()`.
   - Admin access (service role) used ONLY for automated background tasks (if any), strictly restricted.
3. **Database Webhooks**: Used to sync Supabase Auth `users` table to the public `User` table upon registration.

---

## 6. Authentication Flow

1. **Sign Up**: User registers. Frontend derives a Master Key (MK) using Argon2id from the password.
2. **Key Vault Creation**: A random Data Encryption Key (DEK) is generated. The DEK is encrypted using the MK and stored in `EncryptedUserData`.
3. **Login**: User enters password. MK is derived. Frontend fetches encrypted DEK, decrypts it with MK, and stores the raw DEK securely in a Web Worker or HttpOnly Session Cookie memory (never LocalStorage).
4. **OAuth / Magic Link**: Since there is no password, a localized DEK is generated and encrypted using a pin or device-bound WebAuthn credential, or temporarily held in an encrypted secure enclave.

---

## 7. Encryption Architecture (Zero-Knowledge)

- **End-to-End Encryption (E2EE)**: 
  - All text inputs (Thoughts, Messages) are encrypted *on the client* using `AES-GCM-256` before being sent to the server.
  - The server only sees encrypted blobs (`encryptedContent`) and initialization vectors (`iv`).
- **AI Processing Exception**:
  - To allow the AI to read the text, the server must briefly hold the DEK in memory *during the active session request*. 
  - The frontend passes an ephemeral, time-limited Session Token (containing the DEK) via a secure HTTP header during API calls.
  - The API decrypts the message in memory, sends it to OpenAI (via secure TLS, zero data retention policy enabled), receives the response, encrypts the AI's response, and returns it.
  - **No raw text is ever written to the database or disk by the server.**
- **Data Deletion**: Deleting the `EncryptedUserData` instantly renders all user data cryptographically inaccessible.

---

## 8. AI Orchestration Engine

Built using LangChain.js to manage complex state and conditional routing.

**Pipeline Flow:**
1. **Input Decryption**: Server receives encrypted payload & DEK, decrypts in memory.
2. **Analysis Node (LLM Call 1)**:
   - Evaluates emotional tone.
   - Detects cognitive biases (BiasPattern).
   - Determines current `InquiryDepth`.
   - Checks for loop closure/resolution.
3. **Reflection Node (LLM Call 2)**:
   - Takes output of Analysis Node + past session memory.
   - Selects the next best reflective question.
   - Strictly enforces "No Advice" constraints.
4. **Output Encryption**: AI response is encrypted with DEK and streamed back to client.

**Memory Management:**
- Uses a sliding window mechanism. Older messages are summarized and stored in `AIStateMemory` to optimize token usage.

---

## 9. Prompt Engineering System

**System Prompt (Base):**
> "You are Claro, a psychologically-safe reflection environment. You are not a human, not a therapist, and not a friend. You are a mirror. Your ONLY purpose is to ask concise, piercing, reflective questions that help the user untangle their own thoughts. NEVER give advice, suggestions, validations, or diagnosis."

**Anti-Advice Constraints:**
> "If the user asks for what to do, redirect them to their own agency: 'What happens if you don't do anything?' or 'What part of this decision feels the heaviest?'"

**Bias Detection Prompt (Internal Scratchpad):**
> "Analyze the user's statement for the following biases: Sunk-Cost, Confirmation, Avoidance, Perfectionism. Output a JSON payload with identified biases. Do NOT mention the bias by name to the user. Use this to inform the next question."

---

## 10. API Routes

- `POST /api/auth/sync` - Webhook to sync Supabase user.
- `POST /api/chat/stream` - Edge function. Receives encrypted message, decrypts, streams AI response back, encrypts on the fly.
- `GET /api/session/history` - Server Action fetching encrypted session metadata.
- `DELETE /api/user/data` - Cryptographic erasure.

---

## 11. Backend Services

- **EncryptionService**: Handles AES-GCM wrapping/unwrapping.
- **InquiryEngine**: Maps identified biases to inquiry vectors (e.g., Surface -> Anatomy -> Pattern).
- **SessionService**: Manages Prisma database operations, ensuring all `INSERT` statements contain only encrypted buffers.

---

## 12. Frontend-Backend Integration

- **State Management**: React Context / Zustand to hold the temporary DEK in memory.
- **Optimistic UI**: When the user sends a message, it appears immediately in the UI while the encrypted payload is sent to the server.
- **Streaming**: Vercel AI SDK (`useChat`) adapted to intercept streams and decrypt chunks on the fly on the client.

---

## 13. Redis Memory Layer

- **Rate Limiting**: Prevent abuse (e.g., max 50 messages per hour per user).
- **Session Caching**: Store the active session's context window in Upstash Redis (encrypted) for sub-50ms retrieval during the streaming pipeline, avoiding heavy DB hits on every message.
- **Typing State**: Manage the intentional "Claro is reflecting..." artificial delay.

---

## 14. Security Middleware

Next.js Middleware (`middleware.ts`):
- Verifies Supabase JWT on every request.
- Enforces CSRF protection.
- Strict Content Security Policy (CSP) headers.
- Rate limiting check via Redis before hitting the route handler.

---

## 15. Deployment Setup

- **Vercel**: Hosts the Next.js application. Edge runtime enabled for `/api/chat/stream`.
- **Environment Variables**:
  - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `DATABASE_URL`, `DIRECT_URL` (Supabase Postgres)
  - `OPENAI_API_KEY`
  - `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
- **CI/CD**: GitHub Actions integrated with Vercel for preview deployments. Prisma migrations run automatically on build step (`npx prisma migrate deploy`).

---

## 16. Production Scaling Recommendations

1. **Database**: Enable Supabase Point-in-Time Recovery (PITR). Index `sessionId` and `userId` heavily for fast query performance.
2. **AI Provider**: Use OpenAI's Zero Data Retention (ZDR) endpoints for enterprise privacy compliance.
3. **WebSockets**: Transition from HTTP Streaming to WebSockets for more resilient long-lived sessions if timeouts occur on Vercel Serverless.
4. **Monitoring**: Sentry for edge error tracking, Axiom for privacy-compliant log draining (scrubbing all PII).

---
*End of Document*
