

export interface TaskType {
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  dueDate?: string | null ;
  assignedTo: string[];
  todoChecklist: string[];
  attachments: string[];
}


export interface PriorityOption {
  label: string;
  value: "Low" | "Medium" | "High";
}


export interface taskDistributionDataType {
  status: "Pending" | "In Progress" | "Completed";
  count: number;
}
export interface priorityLevelDataType {
  priority: "High" | "Medium" | "Low";
  count: number;
}

export interface initialRegisterDataType{
  email: string,
  name: string,
  profileImageUrl: string,
  password: string,
  tenantName ?: string
}


export interface statusArrayType{
   label : "All" | "Pending" | "Completed" | "In Progress"
   count : number
}









///  task releted

export interface AssignedUser {
  _id: string;
  name: string;
  email: string;
  profileImageUrl: string;
}

export interface TodoChecklist {
  text: string;
  completed: boolean;
}
interface createdBy{
  name : string
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "In Progress" | "Completed";
  dueDate: string; // ISO date string
  assignedTo: AssignedUser[];
  createdBy: createdBy;
  attachments: any[]; // change type if you define attachment structure
  todoChecklist: TodoChecklist[];
  progress: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  completedTodoCount: number;
}

export interface StatusSummary {
  all: number;
  pendingTasks: number;
  CompletedTasks: number;
  inProgressTasks: number;
}

export interface TaskResponse {
  tasks: Task[];
  statusSummary: StatusSummary;
}
