# DevQuest Monorepo Setup Guide

## Overview

This project uses Bun workspaces to manage a monorepo with 4 packages:

- `frontend` - Next.js web application
- `backend` - Bun server with Prisma
- `contracts` - Hardhat smart contracts
- `shared` - Shared types and constants

## Initial Setup

### 1. Clean Install (Recommended if having issues)

Run these commands from the root directory:

**Option A: Use the cleanup script (Easiest)**

```powershell
# PowerShell
.\clean.ps1

# Or CMD
clean.bat

# Then install
bun install
```

**Option B: Manual cleanup**

```powershell
# PowerShell (recommended)
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force frontend\node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force backend\node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force contracts\node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force shared\node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force frontend\.next -ErrorAction SilentlyContinue
Remove-Item -Force bun.lockb -ErrorAction SilentlyContinue
Remove-Item -Force frontend\bun.lockb -ErrorAction SilentlyContinue
Remove-Item -Force backend\bun.lockb -ErrorAction SilentlyContinue
Remove-Item -Force contracts\bun.lockb -ErrorAction SilentlyContinue

# Then install
bun install
```

```cmd
# CMD (if not using PowerShell)
rmdir /s /q node_modules
rmdir /s /q frontend\node_modules
rmdir /s /q backend\node_modules
rmdir /s /q contracts\node_modules
rmdir /s /q shared\node_modules
rmdir /s /q frontend\.next
del /f bun.lockb
del /f frontend\bun.lockb
del /f backend\bun.lockb
del /f contracts\bun.lockb

REM Then install
bun install
```

### 2. Environment Setup

Each workspace needs its environment file:

**Frontend (.env.local):**

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_ETHEREUM_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
NEXT_PUBLIC_NETWORK_ID=11155111
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_ENABLE_TESTNET=true
```

**Backend (.env):**

```bash
DATABASE_URL="postgresql://user:pass@localhost:5432/devquest"
JWT_SECRET=your-secret-key
PORT=5000
```

**Contracts (.env):**

```bash
PRIVATE_KEY=your-wallet-private-key
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
```

### 3. Running the Project

```bash
# From root directory

# Development mode (run in separate terminals)
bun run dev:backend
bun run dev:frontend
bun run dev:contracts

# Or use the helper script
bun run dev
```

## Troubleshooting

### Web3 Provider Errors

If you see `ConnectKitProvider must be within a WagmiProvider`:

**PowerShell:**

```powershell
Remove-Item -Recurse -Force frontend\.next -ErrorAction SilentlyContinue
bun install
cd frontend
bun run dev
```

**CMD:**

```cmd
rmdir /s /q frontend\.next
bun install
cd frontend
bun run dev
```

### Wallet Connection Issues

1. Ensure `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is set in `.env.local`
2. Get a project ID from https://cloud.walletconnect.com
3. Clear browser cache and cookies for localhost

### Monorepo Issues

If packages aren't linking properly:

1. Delete all `node_modules` and `bun.lockb` files
2. Run `bun install` from root only
3. Check that `bunfig.toml` exists in the root

### Build Errors

**Using scripts (recommended):**

```powershell
bun run clean
bun install
bun run build
```

**Manual cleanup:**

```powershell
# PowerShell
.\clean.ps1
bun install
bun run build
```

## Package Structure

```
devquest/
├── bunfig.toml          # Bun workspace config
├── package.json         # Root workspace config
├── bun.lockb            # Single lockfile for all packages
├── frontend/            # No separate lockfile
├── backend/             # No separate lockfile
├── contracts/           # No separate lockfile
└── shared/              # No separate lockfile
```

## Important Notes

- Only run `bun install` from the root directory
- Each workspace should NOT have its own `bun.lockb`
- Use `bun run build:shared` before building other packages if shared types change
- The frontend uses ConnectKit for wallet connections (not RainbowKit or Web3Modal)
