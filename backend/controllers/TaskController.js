import User from "../models/User_Model.js";
import Task from "../models/Task_model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { ApiRes } from "../utils/ApiRes.js";

// create task

const getDashboardData = catchAsync(async (req, res) => {
  const totaltask = await Task.countDocuments(); // getting first all task
  const pendingTasks = await Task.countDocuments({ status: "Pending" }); // pendig task
  const completedTask = await Task.countDocuments({ status: "Completed" }); // completed 
  const inProgressTask = await Task.countDocuments({ status: "In Progress" }); // progress

  const overdueTask = await Task.countDocuments({
    status: { $ne: "Completed" },
    dueDate: { $lt: new Date() }, // means if task is created yesterday then show overdue
  });

  // here we find first all tasks of perticular users by aggregating and we create a new object that contain key as a status (pending , completed , in progress) and value will be the count 


  // ensure that all posibble status are included
  const taskStatus = ["Pending", "In Progress", "Completed"];

  const taskDistribrutionRaw = await Task.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const taskDistribution = taskStatus.reduce((acc, status) => {
    const formattedkey = status.replace(/\s+/g, ""); // remove spaces from response key
    
    acc[formattedkey] =
      taskDistribrutionRaw.find((item) => item?._id === status)?.count || 0;

    return acc;
  }, {});
  taskDistribution["All"] = totaltask;

  // similar do for priority - - -- -- 

  // ensure that all possible priority is incuded

  const Taskpriority = ["Low", "High", "Medium"];

  const TaskpriorityLevelRaw = await Task.aggregate([
    {
      $group: {
        _id: "$priority",
        count: { $sum: 1 },
      },
    },
  ]);

  const taskprioritylevels = Taskpriority.reduce((acc, priority) => {
    acc[priority] =
      TaskpriorityLevelRaw.find((item) => item?._id === priority)?.count || 0;
    return acc;
  }, {});

  // fetch top 10 recent task

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
const getuserDashboardData = catchAsync(async (req, res) => {
  const id = req?.user?._id; // user based data only

  const totaltask = await Task.countDocuments({ assignedTo: id });
  const pendingTask = await Task.countDocuments({ status: "Pending" });
  const completedTask = await Task.countDocuments({ status: "Completed" });

  const overdueTask = await Task.countDocuments({
    assignedTo: id,
    status: { $ne: "Completed" }, // $ne --> not equal to
    dueDate: { $lt: new Date() },
  });

  // task distrubution by status

  const taskStatuses = ["Pending", "Completd", "In Progress"];
  const taskDistribrutionRaw = await Task.aggregate([
    { $match: { assignedTo: id } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  const taskDistribution = taskStatuses.reduce((acc, curr) => {
    const formattedkey = curr.replace(/\s+/g, "");
    acc[formattedkey] =
      taskDistribrutionRaw.find((item) => item?._id === curr)?.count || 0;
    return acc;
  }, {});

  // task distrubution by priority

  const taskpriorites = ["Low", "High", "Medium"];

  const taskprioritesByRaw = await Task.aggregate([
    { $match: { assignedTo: id } },
    { $group: { _id: "$priority", count: { $sum: 1 } } },
  ]);

  const taskprioritylevels = taskpriorites.reduce((acc, curr) => {
    acc[curr] =
      taskprioritesByRaw.find((item) => item?._id === curr)?.count || 0;
    return acc;
  }, {});

  // top 10 recent task logged in user
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

  console.log(attachments , "attachements")
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
const updateTaskChecklist = catchAsync(async (req, res) => {
  const { todoChecklist } = req.body;
  const task = await Task.findById(req?.params?.id);

  if (!task) {
    return res.status(404).json(new ApiRes(true, "task not found "));
  }

  if (!task.assignedTo.includes(req.user?._id) && req.user?.role !== "admin") {
    return new ApiRes(false, "unauthorzied");
  }

  task.todoChecklist = Array.isArray(todoChecklist)
    ? todoChecklist
    : task.todoChecklist || [];

  // auto-update progress based on checklist completion

  const completedCount = task.todoChecklist.filter(
    (item) => item.completed
  ).length;
  const totalItems = task.todoChecklist.length;

  task.progress =
    totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  //  auto-marked task as completed if all items are checked

  if (task.progress === 100) {
    task.status = "Completed";
  } else if (task.progress > 0) {
    task.status = "In Progress";
  } else {
    task.status = "Pending";
  }

  await task.save();
  const updatedTask = await Task.findById(req.params?.id).populate(
    "assignedTo",
    "name email profileImageUrl"
  );

  res.status(200).json(new ApiRes(true, "fetch successfully..", updatedTask));
});
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
