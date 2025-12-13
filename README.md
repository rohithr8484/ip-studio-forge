## Surra

<p align="left"> <img src="https://img.shields.io/badge/Creative-Frontend-pink?style=flat-square" /> <img src="https://img.shields.io/badge/Data-yellow?style=flat-square" /> <img src="https://img.shields.io/badge/Encode Club-blue?style=flat-square" /> </p>
<img width="1857" height="617" alt="image" src="https://github.com/user-attachments/assets/93a54520-c3f9-4569-ad0c-297df1a11c73" />

## Overview

Surra is the Creative Frontend + Data Layer for the IPFI ecosystem. It provides creators with an intuitive interface to generate, upload, register, and visualize IP assets while translating complex on-chain data into simple, actionable insights.

## Features

AI-assisted creative generation

IP registration & metadata organization

Visual derivative & lineage graph viewer

Policy, licensing, and royalty inspection

Enforcement signal and similarity indicators

Unified dashboard across all creative assets

## 📄 Whitepaper

Our whitepaper details Surra’s creative frontend, data layer, and IP workflow.

👉 [Read the Whitepaper](Surra_Whitepaper%20(2).pdf)

### Technical Architecture

Surra functions as:

A Creative Frontend that simplifies the creation and registration of IP

A Data Layer that indexes lineage, metadata, enforcement, and analytics

<img width="576" height="864" alt="image" src="https://github.com/user-attachments/assets/8d36c2b9-75e7-4a08-a5b0-037f6643ad38" />

<img width="313" height="352" alt="image" src="https://github.com/user-attachments/assets/3c382d27-38f8-450e-8a8b-5b4a0e013a9e" />



### Tech Stack

```bash

🌐 Frontend

- React

- TypeScript

- React Router  

🎨 UI & Creative UX

- Radix UI – Accessible UI primitives

- Tailwind CSS – Utility-first styling

- Framer Motion – Animations & transitions

- Lucide React – Icons

- Embla Carousel – Sliders & carousels

- Cmdk, Vaul – Command palette & drawers

- TSParticles – Generative / creative visual effects  

🧠 Forms & State

- React Hook Form + Zod – Forms & validation

- TanStack React Query – Async state & caching

- Sonner – Notifications  

🔐 Wallets & Accounts

- Account Kit (React + Infra) – Embedded wallets & account abstraction

- Wagmi + Viem – Blockchain interactions  

🧬 Web3 & IP Layer

- Story Protocol SDK – IP registration, licensing, remixing & royalties  

🗄️ Data & Backend

- Supabase – Database, auth, and storage  

📊 Visualization & Layout

- Recharts – Analytics & metrics

- React Resizable Panels – Flexible creative layouts  

```

## 📘 Story Protocol – Smart Contract & Package Reference (v1)

This document lists all smart contracts used directly or indirectly, plus all packages required in your project.


## 🧱 Directly Imported Smart Contracts
### ① SPG NFT Contract

Address: 0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc

Purpose:

Mints IP Asset NFTs

Creates the parent IP during registration

### ② Royalty Policy (LAP – License Attribution Protocol)

Address: 0x28b4F70ffE5ba7A26aEF979226f77Eb57fb9Fdb6

Purpose:

Royalty splits

Revenue-share logic

Automated PIL payouts

### ③ WIP Token Contract

Address: WIP_TOKEN_ADDRESS

Purpose:

Payment currency for minting

Settlement currency for royalties

## 🔁 SDK-Triggered Smart Contracts (Indirect)

### ④ IP Asset Registry

Handles:

registerIpAsset

IP metadata storage

Derivative (parent → child) lineage

PIL license term association

### ⑤ License Token Contract (ERC-1155)

Handles:

mintLicenseTokens

PIL license token management

Usage rights + remix & derivative permissioning

### ⑥ PIL Terms Registry

Stores all PIL templates:

Basic

Commercial

Revenue Share

Derivatives Allowed

Non-Commercial Remixing


### 📐 Solidity Struct Reference

struct PILTerms {
 
  bool transferable;
 
  address royaltyPolicy;

  uint256 defaultMintingFee;
 
  bool commercialUse;

  uint32 commercialRevShare;
 
  bool derivativesAllowed;
 
  bool derivativesAttribution;
 
  address currency;
}



### Components

<img width="288" height="494" alt="image" src="https://github.com/user-attachments/assets/69e45af5-969d-44a7-a8ed-2de2662aa29b" />


### Available Scripts

```bash

# Clone the repository

git clone https://github.com/rohithr8484/ip-studio-forge.git

cd ip-studio-forge

# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Development build
npm run build:dev

# Preview production build
npm run preview

# Linting
npm run lint
```

### 🤝 Contributing
We welcome contributions! Please feel free to submit pull requests or open issues to help improve Simple Financial Services.

### 📄 License
This project is proprietary. Please contact the maintainers for access and usage information.
