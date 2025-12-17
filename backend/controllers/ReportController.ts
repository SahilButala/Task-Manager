import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import User from "../models/User_Model";
import Task from "../models/Task_model";
import ExcelJS from "exceljs";
import { Types } from "mongoose";



export const exportTaskReport = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const task = await Task.find().populate(
      "assignedTo",
      "name email"
    );

    const workbook = new ExcelJS.Workbook();
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

    task.forEach((task: any) => {
      const assignedTo = task.assignedTo
        ?.map((user: any) => `${user?.name} (${user?.email})`)
        .join(", ");

      workSheet.addRow({
        _id: task?._id,
        title: task?.title,
        description: task?.description,
        priority: task?.priority,
        status: task?.status,
        dueDate: task?.dueDate
          ? task.dueDate.toISOString().split("T")[0]
          : "",
        assignedTo: assignedTo || "Unassigned",
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="task_report.xlsx"'
    );

    await workbook.xlsx.write(res);
    res.end();
  }
);


interface UserTaskStats {
  name: string;
  email: string;
  taskCount: number;
  pendingTasks: number;
  inProgressTasks: number;
  completedTasks: number;
}

export const exportUserReport = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const users = await User.find().select("name email _id");
    const userTask = await Task.find().populate(
      "assignedTo",
      "name email _id"
    );

    const userTaskMap: Record<string, UserTaskStats> = {};

    users.forEach((singleUser: any) => {
      userTaskMap[singleUser._id.toString()] = {
        name: singleUser?.name,
        email: singleUser?.email,
        taskCount: 0,
        pendingTasks: 0,
        inProgressTasks: 0,
        completedTasks: 0,
      };
    });

    userTask.forEach((task: any) => {
      if (task.assignedTo) {
        task.assignedTo.forEach((assignedUser: any) => {
          const userId = assignedUser?._id?.toString();
          if (userId && userTaskMap[userId]) {
            userTaskMap[userId].taskCount += 1;

            if (task.status === "Pending") {
              userTaskMap[userId].pendingTasks += 1;
            } else if (task.status === "In Progress") {
              userTaskMap[userId].inProgressTasks += 1;
            } else if (task.status === "Completed") {
              userTaskMap[userId].completedTasks += 1;
            }
          }
        });
      }
    });

    const workbook = new ExcelJS.Workbook();
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
      'attachment; filename="user_task_report.xlsx"'
    );

    await workbook.xlsx.write(res);
    res.end();
  }
);
