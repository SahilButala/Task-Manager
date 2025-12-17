import express from "express";

import { protect, adminMiddleware } from "../middlewares/authmiddleware";
import {
  createTask,
  deleteTask,
  getDashboardData,
  getTaks,
  getTaskById,
  getuserDashboardData,
  updateTask,
  updateTaskChecklist,
  updateTaskStatus,
} from "../controllers/TaskController";

import { validate } from "../middlewares/validate";
import {
  createTaskDto,
  updateTaskDto,
  updateTaskStatusDto,
  taskIdParamDto,
} from "../types/task.dto";

const router = express.Router();

// ===============================
// Dashboard Routes
// ===============================
router.get("/dashboard", protect, getDashboardData);
router.get("/user", protect, getuserDashboardData);

// ===============================
// Task Routes
// ===============================
router.get("/", protect, getTaks);

router.get("/:id", protect, validate(taskIdParamDto), getTaskById);

router.post(
  "/",
  protect,
  adminMiddleware,
  validate(createTaskDto),
  createTask
);

router.patch(
  "/:id",
  protect,
  validate(taskIdParamDto.merge(updateTaskDto)),
  updateTask
);

router.patch(
  "/:id/status",
  protect,
  validate(taskIdParamDto.merge(updateTaskStatusDto)),
  updateTaskStatus
);

router.patch(
  "/todo/:id",
  protect,
  validate(taskIdParamDto),
  updateTaskChecklist
);

router.delete(
  "/:id",
  protect,
  adminMiddleware,
  validate(taskIdParamDto),
  deleteTask
);

export default router;
