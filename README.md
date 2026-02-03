# 🚀 DriveFlow: Premium Car Rental & Journey Management Platform

DriveFlow is an elite, full-stack car rental ecosystem designed for high-performance fleet management and seamless user journeys. Built with a **Strictly Type-Safe** architecture, it bridges the gap between secure identity verification and real-time booking logistics.

---

## 🏗️ Technical Architecture (The T3-Elite Stack)

DriveFlow leverages a modern, industrial-grade stack to ensure 100% type safety from the database to the UI.

* **Frontend**: [Next.js 15](https://nextjs.org/) (App Router) with [Chakra UI v3](https://chakra-ui.com/)
* **API Layer**: [tRPC](https://trpc.io/) (End-to-end type safety)
* **Database & ORM**: [Vercel Postgres](https://vercel.com/storage/postgres) with [Prisma](https://www.prisma.io/)
* **Auth**: NextAuth.js (Google OAuth 2.0 & Credentials with Bcrypt)
* **Testing**: [Vitest](https://vitest.dev/) & React Testing Library (JSDOM)

---

## ✨ Features Implemented

### 🏎️ Premium Booking Engine
- **Dynamic Pricing**: Real-time calculation of rental costs based on days and customized add-ons (Full Tank, Insurance, Child Seats).
- **Fleet Management**: High-fidelity car listing with technical specs (HP, Transmission, Fuel Type).
- **Skeleton Loading**: Optimized UX with custom-built skeleton containers for smooth data transitions.

### 🛡️ Identity & Security (KYC)
- **KYC Verification System**: Secure document upload flow (AWS S3/Uploadthing) for driver licenses and identity.
- **Admin Approval Loop**: Dedicated admin procedures to verify users and automatically unlock booking phases.
- **Hybrid Auth**: Secure credential-based login and Google One-Tap integration with HTTP-Only session management.

### 📍 "Mission Control" Journey Tracking
- **7-Step Journey Timeline**: A real-time concierge-style tracker showing milestones:
    - *Reservation ➔ Identity Verified ➔ Deposit Held ➔ Handover ➔ Active Rental ➔ Inspection ➔ Settlement.*
- **Live Rental Progress**: A visual status bar and countdown timer showing exactly how much time remains in the rental period.

### 🧾 Financials & Support
- **Automated Invoicing**: Instant PDF invoice generation including tax breakdowns and service fees.
- **Comprehensive Support Hub**: Full UI suite for Help Center, FAQ, Safety Information, and Legal Terms. 

### 🌐 Professional Support Ecosystem
* **Integrated Help Center**: Searchable FAQ, Safety protocols, and comprehensive Terms of Service.
* **Responsive Dashboard**: 100% mobile-optimized interface with a fixed-dock action menu for on-the-go management.
---

## 📂 Project Structure

```bash
├── prisma/                  
│   ├── schema.prisma         
│   └── seed.ts               
├── public/                   
├── src/
│   ├── app/                  
│   │   ├── (auth)/           
│   │   ├── (main)/           
│   │   ├── (dashboard)/        
│   │   ├── api/trpc/[trpc]/     
│   │   ├── layout.tsx       
│   │   └── page.tsx         
│   ├── components/           
│   │   ├── ui/       
│   ├── server/               
│   │   ├── api/              
│   │   │   ├── routers/      
│   │   │   └── trpc.ts       
│   │   └── db.ts             
│   ├── trpc/                 
│   ├── utils/                
│   └── env/                  
├── tests/                    
├── .env                      
├── next.config.js            
└── package.json              

```

## 🛠️ Installation & Setup Guide

Follow these steps to get **DriveFlow** running on your local development machine.

### 1. Prerequisites
Ensure you have the following installed:
* **Node.js**: v18.17.0 or higher
* **PostgreSQL**: A local instance or a cloud database (Vercel Postgres/Supabase)
* **npm** or **pnpm**

### 2. Clone the Repository
```bash
git clone https://github.com/mkmahmud/driveflow
cd driveflow
```
### 3. Install Dependencies
```bash
npm install
```
### 4. Configure Environment Variables
Create a .env file in the root directory and populate it with your credentials:

```bash
# --- Created by Vercel CLI ---
DATABASE_URL= 
POSTGRES_URL= 
PRISMA_DATABASE_URL=
VERCEL_OIDC_TOKEN=

# --- GOOGLE OAUTH CONFIG --- 
NEXT_PUBLIC_GOOGLE_CLIENT_ID=

#  Google Client ID for OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET= 

# --- APP CONFIG ---
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# --- AWS ---
AWS_ACCESS_KEY_ID=AKIA... (from AWS)
AWS_SECRET_ACCESS_KEY=your_very_long_secret_key
AWS_REGION=us-east-1 (or whichever region you chose for your bucket)
AWS_S3_BUCKET_NAME=your-bucket-name

# --- Stripe ---
STRIPE_SECRET_KEY=""
STRIPE_PUBLISHABLE_KEY=""

# --- SSL Commerce API Keys ----
SSL_STORE_ID=""
SSL_STORE_PASSWORD=""
SSL_IS_LIVE=false
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 5. Database Initialization
Synchronize your database with the Prisma schema and generate the type-safe client:
```bash
# Push the schema to your database
npx prisma db push

# Generate the Prisma Client
npx prisma generate

# (Optional) Seed the database with initial car data
npx prisma db seed
```

### 6. Start Development Server
```bash
npm run dev
```
