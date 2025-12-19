import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllTasksService } from "../../api";
import { Task, TaskResponse } from "../../interfaces";

type NotificationType = "created" | "updated" | null;

export interface NotificationTask {
  task: Task;
  createdAt: string;
  type: NotificationType;
}

interface TaskState {
  task: TaskResponse | null;
  isLoading: boolean;
  notification: number;
  notificationData: NotificationTask[];
}

const initialState: TaskState = {
  task: null,
  isLoading: false,
  notification: 0,
  notificationData: [],
};

export const getAllTasks = createAsyncThunk(
  "/get/taks",
  async ({ filterData }: any) => {
    const { data } = await getAllTasksService(filterData);
    return data;
  }
);

const TaskSlice = createSlice({
  name: "Task",
  initialState,
  reducers: {
    incrementCount: (state) => {
      state.notification += 1;
    },
    clearNotificationCount: (state) => {
      state.notification = 0;
    },
    setNotificationData: (
      state,
      action: PayloadAction<{ task: Task; type: NotificationType }>
    ) => {
      state.notificationData.push({
        task: action.payload.task, // ✅ FIX
        type: action.payload.type,
        createdAt: new Date().toISOString(),
      });
    },

    clearTaskData : (state)=>{
      state.task = null
      state.notification = 0
      state.notificationData = []
    },

    // this function for clear the notification data after 5 days
    clearOldNotifications: (state) => {
      const FIVE_DAYS = 60 * 1000;
      const now = Date.now();

      state.notificationData = state.notificationData.filter(
        (n) => now - new Date(n.createdAt).getTime() < FIVE_DAYS
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.pending, (state, action) => {
        state.isLoading = true;
        state.task = null;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        (state.isLoading = false), (state.task = action.payload);
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.task = null;
      });
  },
});

export const {
  incrementCount,
  clearNotificationCount,
  setNotificationData,
  clearOldNotifications,
  clearTaskData
} = TaskSlice.actions;

export default TaskSlice.reducer;
