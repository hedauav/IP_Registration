# 🚀 Pulse – Blockchain IP Registration & Rights Management Platform  

> **Secure. Own. Monetize.**  
> Empowering creators to register, protect, and monetize their intellectual property using blockchain and zero-knowledge encryption.

## 🎨 Overview

**Pulse** is a next-generation platform designed for creators—musicians, filmmakers, designers, writers, and all creative minds—to **securely register and protect their intellectual property (IP)** using blockchain technology. With built-in **encryption**, and **smart rights management**, Pulse enables creators to **retain control, collaborate seamlessly, and even sell IP rights** *before* public release.

Whether it's a **music track**, **video**, or **script**, Pulse helps you **lock your content**, **prove ownership**, and **sell your rights**—all in one powerful, user-friendly platform.

---

## 🔐 Key Features

### 🎙️ IP Registration
- Register any form of creative IP (music, video, script, document, etc.)
- Upload encrypted content securely
- Time-stamped registration on the blockchain for immutable proof of ownership

### 🔏 Encrypted Storage (Leak-Proof!)
- Files are stored using **advanced encryption**, ensuring **no leaks before release**
- Only authorized users (e.g., collaborators, buyers) can access content via **permissioned access**

### ⚖️ Rights Management
- Assign **exclusive**, **non-exclusive**, or **limited** rights to your IP
- Easily **sell or transfer rights** to others with transparent blockchain-backed records

### 🧠 Zero-Knowledge Proofs (ZKP)
- Generate ZKPs to **prove ownership** or access rights **without exposing underlying content**
- Boosts security and privacy for creators and collaborators

### 📊 Analytics & Reporting
- Visual dashboard to track IP performance
- Insights into profile views, downloads, and interest from buyers/collaborators

### 🧑‍🤝‍🧑 Collaboration Tools
- Invite collaborators securely
- Assign roles and permissions to different users

### 🧾 Creator Credentials
- Showcase your verified creator profile and past works
- Build a **portfolio** with trust backed by blockchain

### 📱 Fully Responsive
- Optimized for mobile, tablet, and desktop
- Seamless experience across all devices

---

## 🧠 Tech Stack

| Technology     | Purpose                                |
|----------------|----------------------------------------|
| **Next.js**    | Server-side rendered frontend framework |
| **React.js**   | UI development                         |
| **Tailwind CSS**| Utility-first CSS framework            |
| **Lucide React** | Icon system for clean UI             |
| **Blockchain** | Backend for immutable IP registration |
| **React Datepicker** | For selecting IP creation dates |
| **Encryption** | To ensure content security             |

---

## 📁 Project Structure

```bash
Pulse/
│
├── app/                         # Next.js App Router structure
│   ├── countdown/               # Countdown page
│   │   ├── [id]/                # Dynamic route for countdown
│   │   └── countdown.module.css
│   │
│   ├── credentials/            # Creator credentials page
│   │   ├── loading.tsx
│   │   └── page.tsx
│   │
│   ├── encrypt-test/           # ZK / encryption test route
│   │   └── page.tsx
│   │
│   ├── images/                 # Asset tier badge icons
│   │   ├── copper.png
│   │   ├── gold.png
│   │   ├── silver.png
│   │   ├── stylus.png
│   │   └── record.png
│   │
│   ├── register/               # IP registration flow
│   │   ├── confirmation/       # Post-registration confirmation page
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── Register.tsx        # Main registration form
│   │   ├── index.tsx
│   │   └── page.tsx
│   │
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   ├── loading.tsx             # App loading fallback
│   ├── page.tsx                # Landing/dashboard
│   ├── providers.tsx           # App-wide providers
│   └── ReactQueryProvider.tsx  # React Query setup
│
├── components/                 # Reusable components (buttons, inputs, cards, etc.)
├── contract/                   # Smart contract interactions
├── hooks/                      # Custom React hooks
├── .gitignore
├── package.json
└── README.md

```

---

## 🚀 Getting Started

### 📦 Prerequisites
- Node.js (Latest LTS version)
- npm / yarn / pnpm

### 🔧 Installation

```bash
git clone https://github.com/KhushiSonkusare/Pulse.git
cd Pulse
npm install --legacy-peer-deps
```

### 🧪 Run Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to explore Pulse.

---

## 🧩 IP Registration Flow

On `register.js`, users will:
1. Enter **Asset Title**
2. Add a **Description**
3. Select the **Creation Date**
4. Define **Rights** (Exclusive, Non-Exclusive, Limited)
5. **Upload an MP4** (Encrypted & stored)
Includes:
- **Input validation**
- **Upload progress bar**
- **Blockchain transaction success indicator**

---

## 🌟 Why Use Pulse?

- ✅ **Immutable Ownership**  
- 🔐 **Pre-release Protection**  
- 💼 **Rights Monetization Tools**  
- 🧠 **Built with Creators in Mind**

Whether you’re an indie artist or a full creative agency—Pulse lets you **own your creations**, **prove authenticity**, and **get paid**.

---

## 👨‍💻 Creators of Pulse

- **Tanmay Gaikwad** – [GitHub](https://github.com/Tan0610)  
- **Ansh Chopada** – [GitHub](https://github.com/Anshchopada11)
- **Aniruddha Lahoti** – [GitHub](https://github.com/aniruddha1295)
- **Anish Hedau** -[GitHub](https://github.com/hedauav)


## 💬 Let's Connect

Have suggestions? PRs are welcome!

Follow our journey as we redefine digital ownership and protect creators worldwide.

> _“Your ideas. Your creation. Your rights. On-chain.”_

