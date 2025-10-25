import { Router } from "express";

const router = Router();

// POST /api/auth/login - Authenticate with wallet signature
router.post("/login", (_req, res) => {
  res.json({ success: true, message: "Auth route - to be implemented" });
});

// POST /api/auth/verify - Verify JWT token
router.post("/verify", (_req, res) => {
  res.json({ success: true, message: "Verify route - to be implemented" });
});

export default router;
