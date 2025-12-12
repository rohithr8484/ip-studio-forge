## Creative Frontend + Data Layer
<p align="left"> <img src="https://img.shields.io/badge/Creative-Frontend-pink?style=flat-square" /> <img src="https://img.shields.io/badge/Data-Layer-yellow?style=flat-square" /> <img src="https://img.shields.io/badge/IPFI-Explorer-blue?style=flat-square" /> </p>
🌈 Overview

Surra is the creator-facing interface and the data intelligence surface for the IPFI ecosystem.
It brings together:

Creative Frontend for generating, uploading, and managing IP

Data Layer for viewing lineage, metadata, enforcement signals, and analytics

Surra transforms raw on-chain IP structures into an intuitive, human-readable experience.

## 📘 Story Protocol – Smart Contract Reference (v1)

A complete list of all direct, indirect, and policy-level contracts used with Story Protocol.

Directly Imported Contracts
# ① SPG NFT Contract

Address: 0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc
Purpose: Mints IP Asset NFTs and creates the parent IP during registration.

# ② Royalty Policy (LAP – License Attribution Protocol)

Address: 0x28b4F70ffE5ba7A26aEF979226f77Eb57fb9Fdb6
Purpose: Royalty splits, revenue-share logic, automated PIL payouts.

# ③ WIP Token Contract

Address: WIP_TOKEN_ADDRESS
Purpose: Payment token for minting and royalty settlement.

SDK-Triggered Contracts (Indirect)
# ④ IP Asset Registry

## Handles IP asset registration, derivative linkage, metadata storage, and PIL term association.

# ⑤ License Token Contract (ERC-1155)

Handles minting license tokens, permissioning, and remix/derivative rights.

# ⑥ PIL Terms Registry

Stores all PIL license templates: Basic, Commercial, Revenue Share, Derivatives, Non-Commercial.

PIL Royalty Policy Suite (Auto-Triggered)
PIL Flavor → Contract Used

Basic → Attribution Logic

Revenue Share → Revenue Share Policy + Royalty Splits

Derivatives → Derivative Lineage Manager

Commercial → Commercial Rights Policy

Story Protocol Core Router

Routes all minting, licensing, derivatives, and policy enforcement operations through the SDK.

## Solidity Struct Reference

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

