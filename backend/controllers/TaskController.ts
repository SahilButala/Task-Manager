import { Request, Response } from "express";
import User from "../models/User_Model";
import Task from "../models/Task_model";
import { catchAsync } from "../utils/catchAsync";
import { ApiRes } from "../utils/ApiRes";
import { ApiError } from "../utils/ApiError";

import Notification from "../models/Notification";
import { getIO } from "../sockets/socket";

// ===============================
// Dashboard (Admin)
// ===============================
const getDashboardData = catchAsync(async (req: Request, res: Response) => {
  const totaltask = await Task.countDocuments();
  const pendingTasks = await Task.countDocuments({ status: "Pending" });
  const completedTask = await Task.countDocuments({ status: "Completed" });
  const inProgressTask = await Task.countDocuments({ status: "In Progress" });

  const overdueTask = await Task.countDocuments({
    status: { $ne: "Completed" },
    dueDate: { $lt: new Date() },
  });

  const taskStatus = ["Pending", "In Progress", "Completed"];

  const taskDistribrutionRaw: { _id: string; count: number }[] =
    await Task.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]);

  const taskDistribution = taskStatus.reduce<Record<string, number>>(
    (acc, status) => {
      const formattedkey = status.replace(/\s+/g, "");
      acc[formattedkey] =
        taskDistribrutionRaw.find((i) => i._id === status)?.count || 0;
      return acc;
    },
    {}
  );

  taskDistribution["All"] = totaltask;

  const Taskpriority = ["Low", "High", "Medium"];

  const TaskpriorityLevelRaw: { _id: string; count: number }[] =
    await Task.aggregate([
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]);

  const taskprioritylevels = Taskpriority.reduce<Record<string, number>>(
    (acc, priority) => {
      acc[priority] =
        TaskpriorityLevelRaw.find((i) => i._id === priority)?.count || 0;
      return acc;
    },
    {}
  );

  const recentTask = await Task.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .select("title priority status dueDate createdAt");

  res.status(200).json(
    new ApiRes(true, "Data fetch successfully...", {
      statistics: {
        totaltask,
        pendingTasks,
        completedTask,
        overdueTask,
      },
      charts: {
        taskDistribution,
        taskprioritylevels,
      },
      recentTask,
    })
  );
});

// ===============================
// Dashboard (User)
// ===============================
const getuserDashboardData = catchAsync(async (req: Request, res: Response) => {
  const id = req.user?._id;

  const totaltask = await Task.countDocuments({ assignedTo: id });
  const completedTask = await Task.countDocuments({ status: "Completed" });

  const overdueTask = await Task.countDocuments({
    assignedTo: id,
    status: { $ne: "Completed" },
    dueDate: { $lt: new Date() },
  });

  const taskStatuses = ["Pending", "Completed", "In Progress"];

  const taskDistribrutionRaw: { _id: string; count: number }[] =
    await Task.aggregate([
      { $match: { assignedTo: id } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

  const taskDistribution = taskStatuses.reduce<Record<string, number>>(
    (acc, curr) => {
      const formattedkey = curr.replace(/\s+/g, "");
      acc[formattedkey] =
        taskDistribrutionRaw.find((i) => i._id === curr)?.count || 0;
      return acc;
    },
    {}
  );

  const taskpriorites = ["Low", "High", "Medium"];

  const taskprioritesByRaw: { _id: string; count: number }[] =
    await Task.aggregate([
      { $match: { assignedTo: id } },
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]);

  const taskprioritylevels = taskpriorites.reduce<Record<string, number>>(
    (acc, curr) => {
      acc[curr] = taskprioritesByRaw.find((i) => i._id === curr)?.count || 0;
      return acc;
    },
    {}
  );

  const recentTask = await Task.find({ assignedTo: id })
    .sort({ createdAt: -1 })
    .limit(10)
    .select("title status priority dueDate createdAt");

  res.status(200).json(
    new ApiRes(true, "fetch successfully..", {
      statistics: {
        totaltask,
        completedTask,
        overdueTask,
      },
      charts: {
        taskDistribution,
        taskprioritylevels,
      },
      recentTask,
    })
  );
});

// ===============================
// Get Tasks
// ===============================
const getTaks = catchAsync(async (req: Request, res: Response) => {
  const { status } = req.query as { status?: string };
  
  const filter: Record<string, any> = {};
  if (status)  filter.status = status.trim();;
  
  let tasks;
  
    console.log(filter , "status")
    console.log(req?.user?.role , "status")

  if (req.user?.role === "admin") {

    tasks = await Task.find(filter).populate(
      "assignedTo",
      "name email profileImageUrl"
    );
    console.log(tasks , "task")
  } else {
    tasks = await Task.find({
      ...filter,
      assignedTo: req.user?._id,
    }).populate("assignedTo", "name email profileImageUrl");
  }

  const mappedTasks = await Promise.all(
    tasks.map(async (item: any) => {
      const completedCount = item.todoChecklist.filter(
        (t: any) => t.completed
      ).length;
      return { ...item.toObject(), completedTodoCount: completedCount };
    })
  );

  const allTasks = await Task.countDocuments(
    req.user?.role === "admin" ? {} : { assignedTo: req.user?._id }
  );

  const pendingTasks = await Task.countDocuments({
    ...filter,
    status: "Pending",
    ...(req.user?.role !== "admin" && { assignedTo: req.user?._id }),
  });

  const inProgressTasks = await Task.countDocuments({
    ...filter,
    status: "In Progress",
    ...(req.user?.role !== "admin" && { assignedTo: req.user?._id }),
  });

  const CompletedTasks = await Task.countDocuments({
    ...filter,
    status: "Completed",
    ...(req.user?.role !== "admin" && { assignedTo: req.user?._id }),
  });

  res.status(200).json(
    new ApiRes(true, "fetch successfully..", {
      tasks: mappedTasks,
      statusSummary: {
        all: allTasks,
        pendingTasks,
        CompletedTasks,
        inProgressTasks,
      },
    })
  );
});

const getTaskById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json(new ApiRes(false, "Task not found.."));
  }

  const task = await Task.findById(id).populate(
    "assignedTo",
    "name email profileImageUrl"
  );

  if (!task) {
    return res.status(404).json(new ApiRes(false, "Task not found.."));
  }

  res.status(200).json(new ApiRes(true, "fetch sucessfully..", task));
});
const createTask = catchAsync(async (req: Request, res: Response) => {
  const {
    title,
    description,
    priority,
    dueDate,
    assignedTo,
    createdBy,
    attachments,
    todoChecklist,
  } = req.body;

  if (!Array.isArray(assignedTo)) {
    return res
      .status(404)
      .json(new ApiRes(true, "assignedTo must be an array of id"));
  }

  console.log(attachments, "attachements");
  const task = await Task.create({
    title,
    description,
    priority,
    dueDate,
    assignedTo,
    createdBy: req.user?._id,
    attachments,
    todoChecklist,
  });

  const io = getIO();

  for (const userId of assignedTo) {
    const notification = await Notification.create({
      userId,
      taskId: task._id,
      message: "You have been assigned a new task",
    });

    io.to(userId.toString()).emit("notification", notification);
  }

  io.emit("task:updated", {
    action: "TASK_CREATED",
    taskId: task._id,
    task,
  });

  res.status(201).json(new ApiRes(true, "Task created successfully..", task));
});
const deleteTask = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json(new ApiRes(true, "Task not found.."));
  }

  const task = await Task.findByIdAndDelete(id).populate(
    "assignedTo",
    "name email profileImageUrl"
  );

  if (!task) {
    return res.status(404).json(new ApiRes(true, "Task not found.."));
  }

  res.status(200).json(new ApiRes(true, "deleted sucessfully..", task));
});
const updateTaskStatus = catchAsync(async (req: Request, res: Response) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!req.user?._id) {
    throw new ApiError(401, "Unauthorized");
  }

  if (!status) {
    return res.status(404).json(new ApiRes(false, "please provide status"));
  }

  const task = await Task.findById(id);

  if (!task) {
    return res.status(404).json(new ApiRes(false, "task  not found"));
  }

  const isAssigned = task.assignedTo.some(
    (userid) => userid.toString() === req?.user?._id.toString()
  );

  console.log(isAssigned, "sasasasasa");

  // if task is not assigned any user then it will unauthorized
  if (!isAssigned && req?.user?.role !== "admin") {
    return res.status(403).json(new ApiRes(false, "unauthorized"));
  }

  task.status = status || task.status;

  if (task.status === "Completed") {
    task?.todoChecklist?.forEach((element) => (element.completed = true));
    task.progress = 100;
  }

  await task.save();

  const io = getIO();

  io.emit("task:updated", {
    action: "STATUS_UPDATED",
    taskId: task?._id,
    task,
  });
  res.status(200).json(new ApiRes(true, "status updated", task));
});
const updateTaskChecklist = catchAsync(async (req: Request, res: Response) => {
  const { todoChecklist } = req.body;

  if (!req.user?._id) {
    throw new ApiError(401, "Unauthorized");
  }

  const userId = req.user._id;
  const userRole = req.user.role;

  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json(new ApiRes(false, "task not found"));
  }

  const isAssigned = task.assignedTo.some((assignedId) =>
    assignedId.equals(userId)
  );

  if (!isAssigned && userRole !== "admin") {
    return res.status(403).json(new ApiRes(false, "unauthorized"));
  }

  task.todoChecklist = Array.isArray(todoChecklist)
    ? todoChecklist
    : task.todoChecklist || [];

  const completedCount = task.todoChecklist.filter(
    (item) => item.completed
  ).length;

  const totalItems = task.todoChecklist.length;

  task.progress =
    totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  if (task.progress === 100) {
    task.status = "Completed";
  } else if (task.progress > 0) {
    task.status = "In Progress";
  } else {
    task.status = "Pending";
  }

  await task.save();

  const updatedTask = await Task.findById(req.params.id).populate(
    "assignedTo",
    "name email profileImageUrl"
  );

  res.status(200).json(new ApiRes(true, "fetch successfully..", updatedTask));
});

const updateTask = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json(new ApiRes(false, "Task not found.."));
  }

  if (req.body.assignedTo) {
    if (!Array.isArray(req?.body?.assignedTo)) {
      return res.status(404).json(new ApiRes(true, "assinedTo must be array"));
    }
  }

  const task = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  }).populate("assignedTo", "name email profileImageUrl").populate("createdBy" , "name");

  if (!task) {
    return res.status(404).json(new ApiRes(false, "Task not found.."));
  }
  const io = getIO();


 if (task.assignedTo?.length) {
  task.assignedTo.forEach((user: any) => {
    io.to(user._id.toString()).emit("task:updated", {
      action: "TASK_UPDATED",
      taskId: task._id,
      task,
    });
  });
}

  res.status(200).json(new ApiRes(true, "updated sucessfully..", task));
});

export {
  updateTask,
  updateTaskChecklist,
  updateTaskStatus,
  deleteTask,
  createTask,
  getTaskById,
  getTaks,
  getuserDashboardData,
  getDashboardData,
};
