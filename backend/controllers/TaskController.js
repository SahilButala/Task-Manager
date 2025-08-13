import User from "../models/User_Model.js";
import Task from "../models/Task_model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { ApiRes } from "../utils/ApiRes.js";

// create task

const getDashboardData = catchAsync(async (req, res) => {});
const getuserDashboardData = catchAsync(async (req, res) => {});
const getTaks = catchAsync(async (req, res) => {
  const { status } = req.query;

  let filter = {};

  if (status) {
    filter.status = status;
  }
  let tasks;
  if (req.user.role === "admin") {
    tasks = await Task.find(filter).populate(
      "assignedTo",
      "name email profileImageUrl"
    );
  } else {
    tasks = await Task.find({ ...filter, assignedTo: req.user?._id }).populate(
      "assignedTo",
      "name email profileImageUrl"
    );
  }

  // add completed todochecklist count to each task

  tasks = await Promise.all(
    tasks.map(async (item) => {
      const completedCount = item.todoChecklist.filter(
        (task) => task.completed
      ).length;
      console.log("completedCount", completedCount);
      return { ...item?._doc, completedTodoCount: completedCount };
    })
  );

  // status count

  const allTasks = await Task.countDocuments(
    req?.user?.role === "admin" ? {} : { assignedTo: req?.user?._id }
  );

  const pendingTasks = await Task.countDocuments({
    ...filter,
    status: "Pending",
    ...(req?.user?.role !== "admin" && { assignedTo: req?.user?._id }),
  });

  const inProgressTasks = await Task.countDocuments({
    ...filter,
    status: "In Progress",
    ...(req?.user?.role !== "admin" && { assignedTo: req?.user?._id }),
  });

  const CompletedTasks = await Task.countDocuments({
    ...filter,
    status: "Completed",
    ...(req?.user?.role !== "admin" && { assignedTo: req?.user?._id }),
  });

  res.status(200).json(
    new ApiRes(true, "fetch suceessfully..", {
      tasks,
      statusSummary: {
        all: allTasks,
        pendingTasks,
        CompletedTasks,
        inProgressTasks,
      },
    })
  );
});
const getTaskById = catchAsync(async (req, res) => {
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
const createTask = catchAsync(async (req, res) => {
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

  res.status(201).json(new ApiRes(true, "Task created successfully..", task));
});
const deleteTask = catchAsync(async (req, res) => {
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
const updateTaskStatus = catchAsync(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

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
    task.todoChecklist.forEach((element) => (element.completed = true));
    task.progress = 100;
  }

  await task.save();
  res.status(200).json(new ApiRes(true, "status updated", task));
});
const updateTaskChecklist = catchAsync(async (req, res) => {});
const updateTask = catchAsync(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json(new ApiRes(false, "Task not found.."));
  }

  const task = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  }).populate("assignedTo", "name email profileImageUrl");

  if (!task) {
    return res.status(404).json(new ApiRes(false, "Task not found.."));
  }

  if (req.body.assignedTo) {
    if (!Array.isArray(req?.body?.assignedTo)) {
      return res.status(404).json(new ApiRes(true, "assinedTo must be array"));
    }
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

// update task

// delete task

// getall task
