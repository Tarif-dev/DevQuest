import { Router } from "express";
import { authenticate } from "../middleware/auth";

const router = Router();

// GET /api/tasks - Get all tasks
router.get("/", (_req, res) => {
  res.json({ success: true, message: "Get all tasks - to be implemented" });
});

// GET /api/tasks/:id - Get task by ID
router.get("/:id", (_req, res) => {
  res.json({ success: true, message: "Get task by ID - to be implemented" });
});

// POST /api/tasks - Create new task (protected)
router.post("/", authenticate, (_req, res) => {
  res.json({ success: true, message: "Create task - to be implemented" });
});

// PUT /api/tasks/:id/assign - Assign task to user (protected)
router.put("/:id/assign", authenticate, (_req, res) => {
  res.json({ success: true, message: "Assign task - to be implemented" });
});

export default router;
