import { Router } from "express";
import { authenticate } from "../middleware/auth";

const router = Router();

// GET /api/projects - Get all projects
router.get("/", (_req, res) => {
  res.json({ success: true, message: "Get all projects - to be implemented" });
});

// GET /api/projects/:id - Get project by ID
router.get("/:id", (_req, res) => {
  res.json({ success: true, message: "Get project by ID - to be implemented" });
});

// POST /api/projects - Create new project (protected)
router.post("/", authenticate, (_req, res) => {
  res.json({ success: true, message: "Create project - to be implemented" });
});

// PUT /api/projects/:id - Update project (protected)
router.put("/:id", authenticate, (_req, res) => {
  res.json({ success: true, message: "Update project - to be implemented" });
});

export default router;
