# JobsFi — Web3 Job Board on ApeChain

JobsFi is a decentralized job board platform built on ApeChain. It streamlines the hiring process through transparency, trust, and immutability — all powered by smart contracts and IPFS.

---
Demo video
[![Watch the demo](https://img.youtube.com/vi/z5Gk_zJVuGQ/0.jpg)](https://youtu.be/z5Gk_zJVuGQ)


## 🚀 Overview

JobsFi allows employers to post job listings and applicants to apply, all on-chain.  
Our current MVP (Minimum Viable Product) supports:

- Smart contract-based job posting
- Subscription model for job access (APE payments)
- On-chain job storage via IPFS (basic but functional)
- Transparent interaction without central control

---

## 🧠 Web3 Stack

- **Smart Contract**: Handles job postings and subscription logic using ApeCoin (APE)
- **IPFS Integration**: Jobs are stored via IPFS for transparency and immutability
- **Decentralization**: Fully decentralized, no central authority
- **Future Features** *(in progress)*:
  - Auto-filtering of applicants based on qualifications
  - On-chain match score calculations

---

## 💰 Monetization Model

- Employers subscribe to post jobs (APE-based)
- Applicants subscribe to apply for jobs
- Fee logic is managed via smart contract (no manual payment process)

---

## 🛠 Tech Stack

- **Frontend**: Next.js + Tailwind CSS
- **Blockchain**: Solidity smart contracts deployed on ApeChain
- **Storage**: IPFS for job listing data
- **Wallet**: MetaMask & WalletConnect supported

---

## 📦 Repository Structure

```bash
├── /components      # Reusable UI components
├── /pages           # Next.js pages
├── /utils           # Helper functions and constants
├── /contracts       # Smart contract ABI and addresses
├── /public          # Static assets
├── README.md
