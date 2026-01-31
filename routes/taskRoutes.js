import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  edittask,
  deleteTask,
} from "../controllers/taskController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.put("/edittask/:id",edittask)

export default router;
