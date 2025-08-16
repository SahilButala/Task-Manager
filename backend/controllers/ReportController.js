import { catchAsync } from "../utils/catchAsync.js";
import User from "../models/User_Model.js";
import Task from "../models/Task_model.js";
import exceljs from "exceljs";

export const exportTaskReport = catchAsync(async (req, res) => {
  const task = await Task.find().populate("assignedTo", "name email");

  const workbook = new exceljs.Workbook();
  const workSheet = workbook.addWorksheet("Tasks Report");

  workSheet.columns = [
    { header: "Task Id", key: "_id", width: 25 },
    { header: "Title", key: "title", width: 30 },
    { header: "Description", key: "description", width: 50 },
    { header: "Priority", key: "priority", width: 15 },
    { header: "Status", key: "status", width: 25 },
    { header: "Due Date", key: "dueDate", width: 25 },
    { header: "Assigned To", key: "assignedTo", width: 30 },
  ];

  task.forEach((task) => {
    const assignedTo = task.assignedTo
      .map((user) => `${user?.name} (${user?.email})`)
      .join(", ");
    workSheet.addRow({
      _id: task?._id,
      title: task?.title,
      description: task?.description,
      priority: task?.priority,
      status: task?.status,
      dueDate: task?.dueDate.toISOString().split("T")[0],
      assignedTo: task?.assignedTo || "Unassigned",
    });
  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  res.setHeader(
    "Content-Disposition",
    'attachment ; filename="task_report.xlsx" '
  );

  return workbook.xlsx.write(res).then(() => {
    res.end();
  });
});

export const exportUserReport = catchAsync(async (req, res) => {
  const id = req?.user?._id;
  const user = await User.find().select("name email _id");

  const userTask = await Task.find().populate("assignedTo", "name email _id");

  const userTaskMap = {};
  user.forEach((singleUser) => {
    userTaskMap[singleUser] = {
      name: singleUser?.name,
      email: singleUser?.email,
      taskCount: 0,
      pendingTasks: 0,
      inProgressTasks: 0,
      completedTasks: 0,
    };
  });

  userTask.forEach((task) => {
    if (task.assignedTo) {
      task.assignedTo.forEach((assignedUser) => {
        if (userTaskMap[assignedUser?._id]) {
          userTaskMap[assignedUser?._id].taskCount += 1;
          if (task.status === "Pending") {
            userTaskMap[assignedUser?._id].pendingTasks += 1;
          } else if (task.status === "In Progress") {
            userTaskMap[assignedUser?._id].inProgressTasks += 1;
          } else if (task.status === "Completed") {
            userTaskMap[assignedUser?._id].completedTasks += 1;
          }
        }
      });
    }
  });

  const workbook = new exceljs.Workbook();
  const workSheet = workbook.addWorksheet("User Task Report");

  workSheet.columns = [
    { header: "User Name", key: "name", width: 25 },
    { header: "Email", key: "email", width: 40 },
    { header: "Total Assigned Task", key: "taskCount", width: 25 },
    { header: "Pending Task", key: "pendingTasks", width: 25 },
    { header: "In Progress Tasks", key: "inProgressTasks", width: 25 },
    { header: "Completed Tasks", key: "completedTasks", width: 25 },
  ];

  Object.values(userTaskMap).forEach((user) => {
    workSheet.addRow(user);
  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  res.setHeader(
    "Content-Disposition",
    'attachment ; filename="task_report.xlsx" '
  );

  return workbook.xlsx.write(res).then(() => {
    res.end();
  });
});
