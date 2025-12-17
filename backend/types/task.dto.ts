import { z } from "zod";

// ===============================
// Create Task DTO
// ===============================
export const createTaskDto = z.object({
  body: z.object({
    title: z.string().min(1).max(100),
    description: z.string().min(1),
    priority: z.enum(["Low", "Medium", "High"]).optional(),
    dueDate: z.coerce.date(),
    assignedTo: z.array(z.string().min(1)),
    attachments: z.array(z.string()).optional(),
    todoChecklist: z
      .array(
        z.object({
          text: z.string(),
          completed: z.boolean(),
        })
      )
      .optional(),
  }),
});

// ===============================
// Update Task DTO
// ===============================
export const updateTaskDto = z.object({
  body: z.object({
    title: z.string().min(1).max(100).optional(),
    description: z.string().optional(),
    priority: z.enum(["Low", "Medium", "High"]).optional(),
    status: z.enum(["Pending", "In Progress", "Completed"]).optional(),
    dueDate: z.coerce.date().optional(),
    assignedTo: z.array(z.string()).optional(),
    attachments: z.array(z.string()).optional(),
  }),
});

// ===============================
// Update Status DTO
// ===============================
export const updateTaskStatusDto = z.object({
  body: z.object({
    status: z.enum(["Pending", "In Progress", "Completed"]),
  }),
});

// ===============================
// Params DTO
// ===============================
export const taskIdParamDto = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});
