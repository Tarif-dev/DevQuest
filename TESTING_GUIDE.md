# DevQuest - Complete Testing Guide

## 🎉 **FULLY IMPLEMENTED FEATURES**

All core features are now complete and ready for testing!

---

## 🚀 **How to Start the Application**

### 1. Start Backend Server

```bash
cd backend
bun run dev
```

**Backend will run on:** http://localhost:5000

### 2. Start Frontend

```bash
cd frontend
bun run dev
```

**Frontend will run on:** http://localhost:3000

---

## ✅ **Complete End-to-End Testing Flow**

### **Step 1: Create a Project (Project Owner)**

1. Go to http://localhost:3000
2. Click **"Connect Wallet"** (top right)
3. Connect your MetaMask wallet (Sepolia network)
4. Navigate to **"Projects"** in the header
5. Click **"+ Create Project"** button
6. Fill in the form:
   - **Project Name:** "My Awesome DApp"
   - **Description:** "A decentralized application for the community"
   - **Repository URL:** "https://github.com/yourname/repo" (optional)
   - **Total Bounty:** 1000 (PYUSD)
7. Click **"Create Project"**
8. You should see: "Project created successfully!" alert
9. You'll be redirected to the projects list
10. Your new project should appear in the grid

---

### **Step 2: Create Tasks (Project Owner)**

1. Click on your project from the projects list
2. You'll see the project detail page
3. Click **"Create Task"** button (or "Create First Task" if no tasks exist)
4. Fill in the modal form:
   - **Task Title:** "Fix login bug"
   - **Description:** "Users can't log in with GitHub OAuth"
   - **Bounty Amount:** 100 (PYUSD)
   - **Difficulty:** Medium
   - **GitHub Issue URL:** (optional)
5. Click **"Create Task"**
6. Page will refresh and you'll see your task in the tasks list
7. Create 2-3 more tasks to test different scenarios

---

### **Step 3: View on Blockchain**

1. On the project detail page, click **"View on Blockchain"**
2. Etherscan will open showing the ProjectRegistry contract
3. Contract address: `0x8df87a09900b4147Ad63804fAEC06919ed15c4A0`
4. You can see all contract interactions on Sepolia testnet

---

### **Step 4: Browse Available Tasks**

1. Click **"Tasks"** in the header
2. You'll see all available tasks from all projects
3. Try the filters:
   - **All Tasks** - Shows everything
   - **Open** - Only unclaimed tasks
   - **Claimed** - Only claimed tasks
   - **Completed** - Only finished tasks

---

### **Step 5: Claim a Task (Contributor)**

1. **Important:** Disconnect your wallet and connect with a **different wallet address** (to simulate a contributor)
2. Go to **"Tasks"** page
3. Find an **"OPEN"** task (shows green "✅ Available to claim")
4. Click **"Claim Task"** button
5. You should see: "Task claimed successfully!" alert
6. Page will refresh
7. The task status should change to **"CLAIMED"**
8. You'll now see a **"Submit Work"** button

---

### **Step 6: Submit Work (Contributor)**

1. As the contributor who claimed the task, click **"Submit Work"**
2. A modal will appear with task details
3. Enter a Pull Request URL:
   - Example: `https://github.com/user/repo/pull/123`
   - Can use any valid GitHub PR URL for testing
4. Read the submission tips
5. Click **"Submit for Review"**
6. Wait for Vincent AI analysis (happens automatically in background)
7. You'll see an alert with your score: "Score: XX/100"
8. The task status will update to **"SUBMITTED"**

---

### **Step 7: Check Payout (Contributor)**

After submitting work:

1. The system automatically:

   - ✅ Analyzes your PR with Vincent AI
   - ✅ Calculates score (70-100)
   - ✅ Calculates payout based on score
   - ✅ Creates contribution record
   - ✅ Creates payout record in database

2. Check the database for your payout:

   ```bash
   cd backend
   bunx prisma studio
   ```

   - Open **"Contribution"** table to see your score
   - Open **"Payout"** table to see payout amount and status

3. Go to **"Dashboard"** to see your stats (coming soon - will show earnings)

---

## 📊 **Testing Different Scenarios**

### **Scenario A: High-Quality Submission**

- Submit with detailed PR description
- Expected: Score 85-100, Full payout

### **Scenario B: Medium-Quality Submission**

- Submit with minimal PR description
- Expected: Score 70-84, Partial payout (80-90%)

### **Scenario C: Multiple Contributors**

- Have 3 different wallets claim 3 different tasks
- Submit work from each wallet
- Compare scores and payouts

### **Scenario D: Project with Multiple Tasks**

- Create a project with 5 tasks
- Have different contributors claim them
- Track which tasks are open/claimed/completed

---

## 🔍 **What to Test**

### **Frontend Features:**

- ✅ Wallet connection (Connect/Disconnect)
- ✅ Project creation with validation
- ✅ Task creation with validation
- ✅ Task filtering (All/Open/Claimed/Completed)
- ✅ Task claiming (only for connected wallets)
- ✅ Submit work modal with PR URL
- ✅ Project detail page with tasks list
- ✅ Navigation between pages
- ✅ Responsive design
- ✅ Error handling and loading states
- ✅ Success/error messages

### **Backend Features:**

- ✅ `POST /api/projects` - Create project
- ✅ `GET /api/projects` - List all projects
- ✅ `GET /api/projects/:id` - Get single project with tasks
- ✅ `POST /api/tasks` - Create task
- ✅ `GET /api/tasks` - List all tasks
- ✅ `POST /api/tasks/:id/claim` - Claim task
- ✅ `POST /api/tasks/:id/submit` - Submit work + auto-score
- ✅ `POST /api/contributions` - Create contribution
- ✅ `POST /api/contributions/:id/analyze` - Vincent AI scoring
- ✅ Database operations (Users, Projects, Tasks, Contributions, Payouts)

### **Vincent AI Integration:**

- ✅ Automatic PR analysis on submission
- ✅ Score calculation (70-100)
- ✅ Feedback generation
- ✅ Payout calculation based on score
- ✅ Database record creation

---

## 🐛 **Common Issues & Solutions**

### **Issue 1: "Failed to create project"**

**Solution:** Make sure backend is running on port 5000

### **Issue 2: "Please connect your wallet"**

**Solution:** Click "Connect Wallet" and approve MetaMask connection

### **Issue 3: "Failed to claim task"**

**Solution:**

- Check if task is already claimed
- Make sure you're connected with a different wallet than the owner
- Refresh the page and try again

### **Issue 4: Database errors**

**Solution:**

```bash
cd backend
bunx prisma migrate dev
bunx prisma generate
```

### **Issue 5: Backend not starting**

**Solution:**

- Check if PostgreSQL is running
- Verify .env file has correct DATABASE_URL
- Run `bunx prisma migrate deploy`

---

## 📈 **Expected Results**

### **After Creating Project:**

- Project appears in `/projects` list
- Owner can see "Create Task" button
- Project detail page shows project info

### **After Creating Task:**

- Task appears in project detail page
- Task appears in `/tasks` list with "OPEN" status
- Any user can see and claim it

### **After Claiming Task:**

- Task status changes to "CLAIMED"
- Assignee wallet is shown
- "Submit Work" button appears for the claimer

### **After Submitting Work:**

- Contribution is created with PR URL
- Vincent AI analyzes and returns score
- Payout is calculated and stored
- Task status updates to "SUBMITTED"
- User sees their score in the alert

---

## 🎯 **Success Criteria**

You'll know everything is working when:

1. ✅ You can create a project as owner
2. ✅ You can create multiple tasks for that project
3. ✅ Another wallet can claim a task
4. ✅ The claimer can submit a PR URL
5. ✅ Vincent AI returns a score (70-100)
6. ✅ Payout is calculated and stored in database
7. ✅ All data persists in PostgreSQL
8. ✅ Navigation works smoothly between pages
9. ✅ Filters work on tasks page
10. ✅ Error messages are clear and helpful

---

## 🔗 **API Endpoints Reference**

### **Projects**

- `GET /api/projects` - List all projects
- `POST /api/projects` - Create project
- `GET /api/projects/:id` - Get project with tasks
- `PUT /api/projects/:id` - Update project

### **Tasks**

- `GET /api/tasks` - List all tasks
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `POST /api/tasks/:id/claim` - Claim task
- `POST /api/tasks/:id/submit` - Submit work

### **Contributions**

- `GET /api/contributions` - List contributions
- `GET /api/contributions/:id` - Get contribution
- `POST /api/contributions` - Create contribution
- `POST /api/contributions/:id/analyze` - Trigger Vincent AI

---

## 📝 **Test Data Examples**

### **Project Data:**

```json
{
  "name": "DeFi Protocol",
  "description": "Decentralized lending platform",
  "repositoryUrl": "https://github.com/user/defi-protocol",
  "totalBounty": "5000",
  "ownerWallet": "0x..."
}
```

### **Task Data:**

```json
{
  "title": "Implement staking rewards",
  "description": "Add reward distribution for stakers",
  "bountyAmount": "500",
  "difficulty": "Hard",
  "projectId": "uuid",
  "ownerWallet": "0x..."
}
```

### **Submit Work Data:**

```json
{
  "prUrl": "https://github.com/user/repo/pull/42",
  "contributorWallet": "0x..."
}
```

---

## 🎊 **What's Been Built**

### **Completed Features:**

1. ✅ Complete project management (CRUD)
2. ✅ Complete task management (Create, Claim, Submit)
3. ✅ Vincent AI integration (mock with realistic scoring)
4. ✅ Contribution tracking
5. ✅ Automated payout calculation
6. ✅ User management (auto-create on first use)
7. ✅ Full UI with all pages and modals
8. ✅ Database schema with Prisma
9. ✅ Error handling and validation
10. ✅ Loading states and success messages

### **Ready for Smart Contract Integration:**

The entire flow works perfectly with the database. When ready, you can add:

- PYUSD approval and deposit
- On-chain project registration
- Actual blockchain payouts
- Lit Protocol encryption
- Real Vincent AI API

---

## 🚀 **Next Steps (Optional Enhancements)**

1. **Smart Contract Integration:**

   - Connect ProjectRegistry contract
   - Implement PYUSD deposit flow
   - Trigger on-chain payouts

2. **Real Vincent AI:**

   - Replace mock with actual Vincent API
   - Implement more sophisticated scoring

3. **GitHub Integration:**

   - OAuth authentication
   - Automatic PR fetching
   - Webhook listeners

4. **IPFS:**

   - Store project metadata
   - Upload contribution proofs

5. **Lit Protocol:**
   - Encrypt sensitive data
   - Access control for private tasks

---

## 📞 **Support**

If you encounter any issues:

1. Check the browser console for errors
2. Check the backend terminal for API errors
3. Verify database connection with `bunx prisma studio`
4. Make sure you're using different wallets for owner/contributor

**Happy Testing! 🎉**
