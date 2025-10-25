# 🔐 DevQuest Environment Variables Setup Guide

This guide will help you gather all the necessary environment variables to run DevQuest seamlessly.

## 📋 Quick Checklist

- [ ] Neon PostgreSQL Database
- [ ] Alchemy RPC Endpoints
- [ ] Ethereum Wallet Private Key
- [ ] GitHub OAuth App
- [ ] Infura IPFS
- [ ] WalletConnect Project
- [ ] Lit Protocol API Key
- [ ] Etherscan API Key
- [ ] Deploy Smart Contracts

---

## 1️⃣ Backend Environment Variables

### 📊 **Neon PostgreSQL Database** (REQUIRED)

**What you need:** Neon database connection string

**How to get it:**

1. Go to [Neon Console](https://console.neon.tech/)
2. Create account / Sign in
3. Click **"Create Project"**
4. Choose project name: `devquest`
5. Select region closest to you
6. Click **"Create Project"**
7. Go to **Dashboard** → **Connection String**
8. Copy the **Prisma** connection string

**Example:**

```bash
DATABASE_URL="postgresql://username:password@ep-xxx-xxx.us-east-2.aws.neon.tech/devquest?sslmode=require"
```

✅ **Copy to:** `backend/.env`

---

### 🔑 **JWT Secret** (REQUIRED - Generate Your Own)

**What you need:** Random secure string for JWT token signing

**How to generate:**

```bash
# Option 1: Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Option 2: Using OpenSSL
openssl rand -hex 64

# Option 3: Online generator
# Visit: https://randomkeygen.com/ (use "CodeIgniter Encryption Keys")
```

**Example:**

```bash
JWT_SECRET=a7f3d8e9c4b2a1f6e8d9c7b3a5f2e1d8c9b7a6f4e3d2c1b9a8f7e6d5c4b3a2f1
JWT_EXPIRES_IN=7d
```

✅ **Copy to:** `backend/.env`

---

### ⛓️ **Alchemy RPC URL** (REQUIRED)

**What you need:** Alchemy API key for Ethereum Sepolia testnet

**How to get it:**

1. Go to [Alchemy](https://www.alchemy.com/)
2. Sign up / Sign in
3. Click **"Create App"**
4. Fill in:
   - **Name:** DevQuest
   - **Chain:** Ethereum
   - **Network:** Sepolia
5. Click **"Create App"**
6. Click **"View Key"**
7. Copy the **HTTPS** URL

**Example:**

```bash
ETHEREUM_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/ABC123XYZ789
```

✅ **Copy to:** `backend/.env` AND `contracts/.env` as `SEPOLIA_RPC_URL`

---

### 💼 **Ethereum Wallet Private Key** (REQUIRED)

**What you need:** Private key from your Ethereum wallet

**How to get it:**

**Using MetaMask:**

1. Open MetaMask extension
2. Click three dots (⋮) → **Account Details**
3. Click **"Show Private Key"**
4. Enter password
5. Copy private key (WITHOUT the 0x prefix)

⚠️ **IMPORTANT:**

- Never share or commit this key
- Use a dedicated wallet for testing
- Get testnet ETH from [Sepolia Faucet](https://sepoliafaucet.com/)

**Example:**

```bash
PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

✅ **Copy to:** `backend/.env` AND `contracts/.env`

---

### 🐙 **GitHub OAuth App** (REQUIRED)

**What you need:** GitHub OAuth credentials for authentication

**How to get it:**

1. Go to [GitHub Settings](https://github.com/settings/developers)
2. Click **"OAuth Apps"** → **"New OAuth App"**
3. Fill in:
   - **Application name:** DevQuest
   - **Homepage URL:** `http://localhost:3000`
   - **Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`
4. Click **"Register application"**
5. Copy **Client ID**
6. Click **"Generate a new client secret"**
7. Copy **Client Secret**

**For GitHub API Access:**

1. Go to [Personal Access Tokens](https://github.com/settings/tokens)
2. Click **"Generate new token (classic)"**
3. Name: `DevQuest API`
4. Select scopes: `repo`, `read:user`, `user:email`
5. Click **"Generate token"**
6. Copy the token

**For Webhooks:**

- Generate random secret: `openssl rand -hex 32`

**Example:**

```bash
GITHUB_CLIENT_ID=Iv1.a1b2c3d4e5f6g7h8
GITHUB_CLIENT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0
GITHUB_WEBHOOK_SECRET=a7f3d8e9c4b2a1f6e8d9c7b3a5f2e1d8
GITHUB_ACCESS_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

✅ **Copy to:** `backend/.env`

---

### 📦 **Infura IPFS** (REQUIRED)

**What you need:** Infura IPFS project credentials

**How to get it:**

1. Go to [Infura](https://infura.io/)
2. Sign up / Sign in
3. Click **"Create New Key"**
4. Select **"IPFS"**
5. Name: `DevQuest IPFS`
6. Click **"Create"**
7. Copy **Project ID** and **API Key Secret**

**Example:**

```bash
IPFS_API_URL=https://ipfs.infura.io:5001
IPFS_GATEWAY_URL=https://ipfs.io/ipfs/
IPFS_PROJECT_ID=2ABC123XYZ789DEF456
IPFS_PROJECT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

✅ **Copy to:** `backend/.env`

---

### 🌐 **Lit Protocol** (OPTIONAL)

**What you need:** Lit Protocol API key

**How to get it:**

1. Go to [Lit Protocol](https://developer.litprotocol.com/)
2. Follow their documentation for API access
3. For now, you can skip this or use test network

**Example:**

```bash
LIT_NETWORK=serrano
LIT_API_KEY=your-lit-api-key
```

✅ **Copy to:** `backend/.env`

---

### 💰 **PYUSD Contract Address** (Will be added after you find it)

**What you need:** PYUSD token contract address on Sepolia

**How to get it:**

- Check [PayPal Developer Docs](https://developer.paypal.com/community/blog/pyusd-on-ethereum/)
- Or search on [Sepolia Etherscan](https://sepolia.etherscan.io/)
- For testing, you might deploy a mock ERC20 token

**Example:**

```bash
PYUSD_CONTRACT_ADDRESS=0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238
```

✅ **Copy to:** `backend/.env`

---

## 2️⃣ Frontend Environment Variables

### 🔗 **WalletConnect Project ID** (REQUIRED)

**What you need:** WalletConnect Cloud project ID

**How to get it:**

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Sign up / Sign in
3. Click **"Create New Project"**
4. Name: `DevQuest`
5. Copy the **Project ID**

**Example:**

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

✅ **Copy to:** `frontend/.env.local`

---

### 🌐 **API URL** (Already set for local dev)

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

✅ **Copy to:** `frontend/.env.local`

---

### ⛓️ **Ethereum RPC URL** (Same as backend)

Use the same Alchemy URL from backend

```bash
NEXT_PUBLIC_ETHEREUM_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/ABC123XYZ789
```

✅ **Copy to:** `frontend/.env.local`

---

### 🔢 **Network ID** (Already set for Sepolia)

```bash
NEXT_PUBLIC_NETWORK_ID=11155111
```

✅ **Copy to:** `frontend/.env.local`

---

## 3️⃣ Smart Contracts Environment Variables

### 🔍 **Etherscan API Key** (REQUIRED for verification)

**What you need:** Etherscan API key for contract verification

**How to get it:**

1. Go to [Etherscan](https://etherscan.io/)
2. Sign up / Sign in
3. Go to **Account** → **API Keys**
4. Click **"Add"**
5. Name: `DevQuest`
6. Copy the API key

**Example:**

```bash
ETHERSCAN_API_KEY=ABC123XYZ789DEF456GHI789JKL012
```

✅ **Copy to:** `contracts/.env`

---

### 💹 **CoinMarketCap API Key** (OPTIONAL - for gas reporting)

**What you need:** CoinMarketCap API key

**How to get it:**

1. Go to [CoinMarketCap API](https://coinmarketcap.com/api/)
2. Sign up
3. Get your free API key

**Example:**

```bash
COINMARKETCAP_API_KEY=a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6
REPORT_GAS=true
```

✅ **Copy to:** `contracts/.env`

---

## 4️⃣ After Smart Contract Deployment

After you deploy the smart contracts (step explained below), you'll need to update:

### **Backend** (`backend/.env`):

```bash
CONTRACT_PROJECT_REGISTRY=0x5FbDB2315678afecb367f032d93F642f64180aa3
CONTRACT_PROJECT_ESCROW=0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
CONTRACT_FEATURE_TASK=0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
CONTRACT_PAYOUT_DISTRIBUTOR=0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
```

### **Frontend** (`frontend/.env.local`):

```bash
NEXT_PUBLIC_CONTRACT_PROJECT_REGISTRY=0x5FbDB2315678afecb367f032d93F642f64180aa3
NEXT_PUBLIC_CONTRACT_PROJECT_ESCROW=0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
NEXT_PUBLIC_CONTRACT_FEATURE_TASK=0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
NEXT_PUBLIC_CONTRACT_PAYOUT_DISTRIBUTOR=0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
NEXT_PUBLIC_PYUSD_CONTRACT_ADDRESS=0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238
```

### **Contracts** (`contracts/.env`):

```bash
PROJECT_REGISTRY_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
PROJECT_ESCROW_ADDRESS=0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
FEATURE_TASK_ADDRESS=0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
PAYOUT_DISTRIBUTOR_ADDRESS=0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
```

---

## 🚀 Setup Steps

### 1. Create Environment Files

```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your values

# Frontend
cp frontend/.env.example frontend/.env.local
# Edit frontend/.env.local with your values

# Contracts
cp contracts/.env.example contracts/.env
# Edit contracts/.env with your values
```

### 2. Setup Neon Database

```bash
cd backend
bunx prisma generate
bunx prisma migrate dev --name init
```

### 3. Deploy Smart Contracts

```bash
cd contracts
bun run deploy:sepolia
# Save the deployed contract addresses
```

### 4. Update Contract Addresses

Update the contract addresses in all three `.env` files as shown in section 4 above.

### 5. Start Development

```bash
# From root directory
bun run dev
```

---

## 📝 Summary Checklist

### Critical (Must Have):

- ✅ Neon PostgreSQL connection string
- ✅ JWT secret (generate random)
- ✅ Alchemy RPC URL (Sepolia)
- ✅ Ethereum wallet private key
- ✅ GitHub OAuth credentials
- ✅ Infura IPFS credentials
- ✅ WalletConnect Project ID
- ✅ Etherscan API key

### Optional (Can add later):

- ⭕ Lit Protocol API key
- ⭕ CoinMarketCap API key
- ⭕ PYUSD contract address (deploy mock if needed)

### After Deployment:

- ⏳ Smart contract addresses (4 contracts)

---

## 🆘 Need Help?

- **Neon PostgreSQL:** [Documentation](https://neon.tech/docs/introduction)
- **Alchemy:** [Get Started](https://docs.alchemy.com/docs/alchemy-quickstart-guide)
- **GitHub OAuth:** [Creating an OAuth App](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)
- **Infura IPFS:** [Getting Started](https://docs.infura.io/infura/networks/ipfs)
- **WalletConnect:** [Cloud Setup](https://cloud.walletconnect.com/)

---

**🎉 Once you have all these variables configured, your DevQuest platform will be fully operational!**
