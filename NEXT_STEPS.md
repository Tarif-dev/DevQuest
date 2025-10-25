# DevQuest - Complete Build Plan & Integration Guide

## 🎯 Yes, I Remember! Here's What We're Building

**DevQuest** is a **Decentralized Bounty Platform** where:

1. **Project Owners** create projects and deposit PYUSD into escrow
2. **Contributors** claim tasks, submit PRs, and get automatically paid based on contribution quality
3. **Vincent AI** analyzes PRs and scores contributions
4. **Lit Protocol** encrypts sensitive project data
5. **Smart Contracts** handle all payments and records on Ethereum

---

## ✅ What's Already Working (Current State)

### Frontend (React/Next.js)

- ✅ Wallet connection (ConnectKit)
- ✅ Homepage with stats and recent projects
- ✅ Projects list page (fetches from backend API)
- ✅ Create project page (fully functional)
- ✅ Project detail page (newly created)
- ✅ Tasks page with filters
- ✅ All UI/UX components

### Backend (Express/PostgreSQL)

- ✅ Database schema (Users, Projects, Tasks, Contributions, Payouts)
- ✅ Prisma ORM setup
- ✅ GET /api/projects (lists all projects)
- ✅ POST /api/projects (creates project + auto-creates user)
- ✅ GET /api/projects/:id (gets single project)
- ✅ PUT /api/projects/:id (updates project)
- ⚠️ Task routes (placeholders)
- ⚠️ Contribution routes (placeholders)
- ⚠️ Auth routes (partially implemented)

### Smart Contracts (Deployed on Sepolia)

- ✅ ProjectRegistry: `0x8df87a09900b4147Ad63804fAEC06919ed15c4A0`
- ✅ ProjectEscrow: `0x4B3101E4D1367A3A91Eb285bd24E4Eb38A9C86d6`
- ✅ FeatureTask: `0xd1302Ee4AE232E2216f7f4a6E7D6B437778535C0`
- ✅ PayoutDistributor: `0xC4F308aa475bb8C2fD5F1Ed2340E11Eb0c4DD25b`
- ✅ MockPYUSD: `0xdAd9F4e3DC5f7843691807c75e1392e0DaA53F5a`

---

## 🔧 What Needs to Be Built (Priority Order)

### **PHASE 1: Complete Backend API** 🎯 START HERE

#### 1. Task Management Routes

```typescript
// backend/src/routes/taskRoutes.ts
✅ GET /api/tasks - List all tasks (already working)
❌ GET /api/tasks/:id - Get single task
❌ POST /api/tasks - Create task (owner only)
❌ PUT /api/tasks/:id - Update task
❌ POST /api/tasks/:id/claim - Claim a task (contributor)
❌ POST /api/tasks/:id/submit - Submit work (contributor)
```

#### 2. Contribution Management Routes

```typescript
// backend/src/routes/contributionRoutes.ts
❌ GET /api/contributions - List contributions
❌ GET /api/contributions/:id - Get single contribution
❌ POST /api/contributions - Create contribution (with PR URL)
❌ PUT /api/contributions/:id - Update contribution status
❌ POST /api/contributions/:id/score - Vincent AI scoring endpoint
```

#### 3. Auth Routes (Complete Implementation)

```typescript
// backend/src/routes/authRoutes.ts
⚠️ POST /api/auth/nonce - Get nonce for signing (partial)
⚠️ POST /api/auth/login - Login with wallet signature (partial)
❌ POST /api/auth/verify - Verify JWT token
❌ GET /api/auth/me - Get current user profile
```

---

### **PHASE 2: Smart Contract Integration** 🔗

#### Frontend Contract Hooks (using wagmi)

```typescript
// frontend/src/hooks/useContracts.ts
❌ useProjectRegistry() - Read/write to ProjectRegistry
❌ useProjectEscrow() - Deposit PYUSD, withdraw funds
❌ useFeatureTask() - Create tasks, assign, complete
❌ usePayoutDistributor() - Trigger payouts
❌ usePYUSD() - Approve, transfer, check balance
```

#### Key Contract Operations

1. **Create Project Flow**:

   - ✅ Save project to database (working)
   - ❌ Register project on-chain (ProjectRegistry)
   - ❌ Approve PYUSD for escrow
   - ❌ Deposit PYUSD to ProjectEscrow
   - ❌ Update project with escrow address

2. **Create Task Flow**:

   - ❌ Save task to database
   - ❌ Create task on-chain (FeatureTask)
   - ❌ Link to project

3. **Claim Task Flow**:

   - ❌ Update task status in database
   - ❌ Assign task on-chain
   - ❌ Record assignee

4. **Submit Work Flow**:

   - ❌ Create contribution in database
   - ❌ Store PR URL and metadata
   - ❌ Trigger Vincent AI scoring

5. **Payout Flow**:
   - ❌ Get contribution score from Vincent
   - ❌ Calculate payout amount
   - ❌ Execute payout via PayoutDistributor
   - ❌ Record transaction hash

---

### **PHASE 3: GitHub Integration** 🔗

```typescript
// backend/src/services/github.ts
❌ authenticateUser() - GitHub OAuth
❌ fetchPR() - Get PR details
❌ validatePR() - Check PR is valid
❌ getPRFiles() - Get changed files
❌ getPRDiff() - Get code diff
❌ addComment() - Comment on PR
❌ createWebhook() - Listen for PR events
```

**GitHub Webhook Events to Handle:**

- `pull_request.opened` - New PR submitted
- `pull_request.closed` - PR merged/closed
- `pull_request.review_requested` - Review requested
- `issue_comment.created` - Comment added

---

### **PHASE 4: Vincent AI Integration** 🤖

```typescript
// backend/src/services/vincent.ts
❌ analyzeContribution(prUrl) - Send PR to Vincent
❌ getScore(contributionId) - Get contribution score (0-100)
❌ getFeedback(contributionId) - Get AI feedback
❌ triggerPayout(contributionId) - Auto-payout if score > threshold
```

**Vincent AI Scoring Criteria:**

- Code quality (40%)
- Test coverage (20%)
- Documentation (15%)
- PR description quality (10%)
- Code style adherence (10%)
- Bug fixes vs features (5%)

**Score to Payout Mapping:**

- 90-100: 100% bounty
- 80-89: 90% bounty
- 70-79: 80% bounty
- 60-69: 70% bounty
- < 60: Needs revision

---

### **PHASE 5: Lit Protocol Integration** 🔐

```typescript
// backend/src/services/lit.ts
❌ encryptData(data) - Encrypt sensitive project data
❌ decryptData(encryptedData) - Decrypt with access control
❌ createAccessControl(projectId) - Set who can access
❌ grantAccess(projectId, walletAddress) - Grant access
❌ revokeAccess(projectId, walletAddress) - Revoke access
```

**Use Cases for Lit Protocol:**

1. **Private Project Data**: Encrypt project details only visible to owner/contributors
2. **Sensitive Task Info**: Hide implementation details until task is claimed
3. **Contributor Feedback**: Private AI feedback visible only to contributor
4. **API Keys/Secrets**: Securely share credentials with verified contributors

---

### **PHASE 6: IPFS Integration** 📦

```typescript
// backend/src/services/ipfs.ts
❌ uploadFile(file) - Upload to IPFS
❌ uploadJSON(data) - Upload JSON metadata
❌ getFile(hash) - Retrieve from IPFS
❌ pinFile(hash) - Pin important files
```

**What to Store on IPFS:**

- Project metadata and descriptions
- Task specifications
- Contribution proof (code diffs, screenshots)
- Payout receipts
- Reputation proofs

---

## 🔌 Complete Integration Flow (End-to-End)

### 1. **Project Owner Creates Project**

```
User Flow:
1. Connect wallet → Frontend
2. Fill project form → Frontend
3. Click "Create Project" → Frontend

Backend Actions:
✅ Create user if not exists
✅ Save project to database
❌ Register project on ProjectRegistry contract
❌ Return project ID + on-chain data

Frontend Actions:
❌ Show "Approve PYUSD" button
❌ Call PYUSD.approve(escrowAddress, bountyAmount)
❌ Show "Deposit Funds" button
❌ Call ProjectEscrow.deposit(projectId, amount)
❌ Upload metadata to IPFS
❌ Update project with IPFS hash
✅ Redirect to project detail page
```

### 2. **Owner Creates Tasks**

```
User Flow:
1. Go to project detail page
2. Click "Create Task"
3. Fill task form (title, description, bounty)
4. Submit

Backend Actions:
❌ Validate project ownership
❌ Save task to database
❌ Create task on FeatureTask contract
❌ Upload task metadata to IPFS
❌ Return task ID

Frontend Actions:
❌ Show success message
❌ Refresh tasks list
❌ Show task on project page
```

### 3. **Contributor Claims Task**

```
User Flow:
1. Browse tasks page
2. Click "Claim Task"
3. Confirm transaction

Backend Actions:
❌ Check task is available
❌ Update task status to "ASSIGNED"
❌ Update assignee to contributor
❌ Call FeatureTask.assignTask(taskId, contributorAddress)

Frontend Actions:
❌ Sign transaction
❌ Show "Task Claimed" message
❌ Update UI to show "Submit Work" button
```

### 4. **Contributor Submits Work**

```
User Flow:
1. Complete work and create PR on GitHub
2. Go to task page
3. Click "Submit Work"
4. Paste PR URL
5. Submit

Backend Actions:
❌ Validate PR URL
❌ Fetch PR details from GitHub API
❌ Create contribution record
❌ Store PR metadata in database
❌ Send PR to Vincent AI for analysis
❌ Wait for Vincent score

Vincent AI Actions:
❌ Clone repo and checkout PR
❌ Run static analysis
❌ Check code quality
❌ Calculate score (0-100)
❌ Generate feedback
❌ Send score back to backend

Backend Actions (After Score):
❌ Update contribution with score
❌ If score >= 70, trigger payout
❌ Calculate payout amount (score * bountyAmount)
❌ Call PayoutDistributor.distributePayout()

Smart Contract Actions:
❌ Release funds from escrow
❌ Transfer PYUSD to contributor
❌ Emit PayoutCompleted event
❌ Update task status to "COMPLETED"

Backend Actions (After Payout):
❌ Record transaction hash
❌ Update payout status to "COMPLETED"
❌ Update user reputation
❌ Send notification (optional)

Frontend Actions:
❌ Show success message with transaction link
❌ Display received amount
❌ Update user balance
❌ Show feedback from Vincent AI
```

---

## 📦 Required Integrations Summary

### **Must Have (Core Functionality)**

1. ✅ **Wallet Connection** - ConnectKit/Wagmi (DONE)
2. ✅ **Database** - PostgreSQL + Prisma (DONE)
3. ⚠️ **Smart Contracts** - Deploy + Frontend hooks (CONTRACTS DEPLOYED, NEED HOOKS)
4. ❌ **PYUSD** - Approve + Transfer operations
5. ❌ **GitHub API** - PR fetching and validation
6. ❌ **Vincent AI** - Contribution scoring

### **Should Have (Enhanced Experience)**

7. ❌ **IPFS** - Metadata storage
8. ❌ **Lit Protocol** - Access control
9. ❌ **GitHub OAuth** - User authentication
10. ❌ **GitHub Webhooks** - Automated PR tracking

### **Nice to Have (Future Enhancements)**

11. ❌ **Notifications** - Email/Push for events
12. ❌ **Analytics** - Dashboard with stats
13. ❌ **Reputation System** - Gamification
14. ❌ **Dispute Resolution** - Manual review flow

---

## 🏗️ Recommended Build Order

### **Week 1: Backend API Completion**

- Day 1-2: Complete task routes
- Day 3-4: Complete contribution routes
- Day 5-6: Complete auth routes
- Day 7: Testing and bug fixes

### **Week 2: Smart Contract Integration**

- Day 1-2: Create wagmi hooks for all contracts
- Day 3-4: Integrate project creation with on-chain
- Day 5-6: Integrate task creation and claiming
- Day 7: Test complete flow

### **Week 3: GitHub + Vincent Integration**

- Day 1-3: GitHub API integration (PR fetching)
- Day 4-5: Vincent AI mock implementation
- Day 6-7: Payout flow integration

### **Week 4: Enhancement + Testing**

- Day 1-2: IPFS integration
- Day 3-4: Lit Protocol (optional)
- Day 5-7: End-to-end testing + bug fixes

---

## 🎯 What Should We Build FIRST?

I recommend we start with:

### **Option A: Complete Backend (Task Management)**

✅ This allows testing the full user flow without blockchain complexity

- Implement task CRUD operations
- Implement contribution submission
- Mock Vincent AI scoring
- Test with frontend

### **Option B: Smart Contract Integration**

✅ This makes the platform truly decentralized

- Create contract interaction hooks
- Integrate PYUSD approval/transfer
- Connect project creation to blockchain
- Test on Sepolia testnet

### **Option C: GitHub Integration**

✅ This enables real PR tracking

- Set up GitHub OAuth
- Fetch PR details
- Validate PRs
- Create webhooks

**Which one should we tackle first?** 🤔

Let me know and I'll start building immediately!
