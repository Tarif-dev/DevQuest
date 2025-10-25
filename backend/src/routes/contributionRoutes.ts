import { Router } from "express";
import { authenticate } from "../middleware/auth";

const router = Router();

// GET /api/contributions - Get all contributions
router.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Get all contributions - to be implemented",
  });
});

// GET /api/contributions/:id - Get contribution by ID
router.get("/:id", (_req, res) => {
  res.json({
    success: true,
    message: "Get contribution by ID - to be implemented",
  });
});

// POST /api/contributions - Submit contribution (protected)
router.post("/", authenticate, (_req, res) => {
  res.json({
    success: true,
    message: "Submit contribution - to be implemented",
  });
});

// PUT /api/contributions/:id/score - Score contribution (protected)
router.put("/:id/score", authenticate, (_req, res) => {
  res.json({
    success: true,
    message: "Score contribution - to be implemented",
  });
});

export default router;
