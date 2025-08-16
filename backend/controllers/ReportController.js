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
});
