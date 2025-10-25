# DevQuest

A decentralized bounty platform using PYUSD for payments and Lit Protocol/Vincent for access control and automation.

## 🎯 Overview

DevQuest enables project owners to create bounty programs for their GitHub repositories. Contributors can register for tasks, submit work via pull requests, and receive automated PYUSD payments based on their contributions.

### Key Features

- **Project & Task Management**: Create projects with bounties and break them into tasks
- **GitHub Integration**: Automatic PR tracking and verification
- **PYUSD Payments**: Secure escrow and automated payouts using PayPal USD stablecoin
- **Lit Protocol**: Encrypted access control for sensitive project data
- **Vincent Agents**: Automated contribution verification and payout triggers
- **On-chain Proof**: Immutable contribution records on Ethereum
- **Reputation System**: Track contributor performance across projects

## 🏗️ Architecture

```
devquest/
├── frontend/          # Next.js React app with TypeScript
├── backend/           # Express.js API server
├── contracts/         # Solidity smart contracts (Hardhat)
└── shared/            # Shared TypeScript types
```

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Web3**: Ethers.js, Wagmi, RainbowKit
- **State Management**: React Query

### Backend

- **Runtime**: Node.js with Express & TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with wallet signatures
- **Integrations**: GitHub API, IPFS, Lit Protocol

### Smart Contracts

- **Language**: Solidity ^0.8.24
- **Framework**: Hardhat
- **Libraries**: OpenZeppelin Contracts
- **Network**: Ethereum (Sepolia testnet)

### Contracts

- `ProjectRegistry`: Project metadata and ownership
- `ProjectEscrow`: PYUSD fund management
- `FeatureTask`: Task lifecycle management
- `PayoutDistributor`: Automated payment distribution

## 🚀 Quick Start

### Prerequisites

- **Bun** v1.1+ ([install](https://bun.sh))
- **PostgreSQL** database
- **Git** and **Node.js** 18+
- Ethereum wallet with Sepolia testnet ETH

### Installation

```bash
# Clone the repository
git clone https://github.com/Tarif-dev/DevQuest.git
cd DevQuest

# Install all dependencies
bun install:all

# Or install individually
bun install
cd frontend && bun install
cd ../backend && bun install
cd ../contracts && bun install
cd ../shared && bun install
```

### Environment Setup

1. **Backend**: Copy `backend/.env.example` to `backend/.env` and configure:

   - Database connection string
   - JWT secret
   - Ethereum RPC URL
   - GitHub OAuth credentials

2. **Frontend**: Copy `frontend/.env.example` to `frontend/.env.local`:

   - API URL
   - Contract addresses
   - WalletConnect project ID

3. **Contracts**: Copy `contracts/.env.example` to `contracts/.env`:
   - Private key (for deployment)
   - Etherscan API key
   - RPC URLs

### Database Setup

```bash
cd backend

# Generate Prisma client
bunx prisma generate

# Run migrations
bunx prisma migrate dev

# (Optional) Open Prisma Studio
bunx prisma studio
```

### Smart Contract Deployment

```bash
cd contracts

# Compile contracts
bun run compile

# Run tests
bun run test

# Deploy to local network
bun run node          # Terminal 1
bun run deploy:local  # Terminal 2

# Deploy to Sepolia testnet
bun run deploy:sepolia
```

### Development

```bash
# Run all services (from root)
bun run dev

# Or run individually:
bun run dev:frontend   # http://localhost:3000
bun run dev:backend    # http://localhost:5000
bun run dev:contracts  # http://localhost:8545
```

## 📝 Scripts

### Root Level

- `bun run dev` - Start all services
- `bun run build` - Build all projects
- `bun run test` - Run all tests
- `bun install:all` - Install all dependencies

### Frontend

- `bun run dev` - Start dev server
- `bun run build` - Build for production
- `bun run start` - Start production server

### Backend

- `bun run dev` - Start dev server with hot reload
- `bun run build` - Compile TypeScript
- `bun run start` - Start production server
- `bun run prisma:generate` - Generate Prisma client
- `bun run prisma:migrate` - Run database migrations

### Contracts

- `bun run compile` - Compile smart contracts
- `bun run test` - Run contract tests
- `bun run deploy:sepolia` - Deploy to Sepolia testnet
- `bun run node` - Start local Hardhat network

## 🧪 Testing

```bash
# Backend tests
cd backend && bun run test

# Contract tests
cd contracts && bun run test

# Contract test coverage
cd contracts && bunx hardhat coverage

# Gas reporting
REPORT_GAS=true bun run test
```

## 📚 Documentation

- [Backend API Documentation](./backend/README.md)
- [Smart Contracts Documentation](./contracts/README.md)
- [Frontend Components](./frontend/README.md)

## 🔐 Security

- Smart contracts audited (pending)
- Uses OpenZeppelin secure contract libraries
- JWT authentication with wallet signatures
- Rate limiting on API endpoints
- Input validation with Zod

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

## 🙏 Acknowledgments

- Built for [Hackathon Name]
- PYUSD integration
- Lit Protocol for encryption
- Vincent AI agents for automation

## 📞 Support

- GitHub Issues: [Report bugs](https://github.com/Tarif-dev/DevQuest/issues)
- Documentation: [Wiki](https://github.com/Tarif-dev/DevQuest/wiki)

---

**Made with ❤️ by the DevQuest Team**
