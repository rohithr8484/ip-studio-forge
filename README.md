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

## Architecture

Surra functions as:

A Creative Frontend that simplifies the creation and registration of IP

A Data Layer that indexes lineage, metadata, enforcement, and analytics



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

```bash

---



```

### Available Scripts

```bash

# Clone the repository

git clone https://github.com/rohithr8484/story-creator-hub.git

cd story-creator-hub

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
