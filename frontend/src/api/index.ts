import { apiPaths } from "../constants/index.js";
import axiosInstance from "../utils/axiosInstance.js";

export const LoginService = async (formdata: any) => {
  const { data } = await axiosInstance.post(apiPaths.AUTH.LOGIN, {
    ...formdata,
  });
  return data;
};

export const RegisterService = async (formdata: any) => {
  const { data } = await axiosInstance.post(apiPaths.AUTH.REGISTER, {
    ...formdata,
  });
  return data;
};

export const getAllUsersService = async () => {
  const { data } = await axiosInstance.get(apiPaths.USERS.GET_ALL_USERS);

  return data;
};

export const getAllTasksService = async ({
  filterData,
  startDate,
  endDate,
}: {
  startDate?: string;
  endDate?: string;
  filterData: any;
}) => {
  const { data } = await axiosInstance.get(apiPaths.TASKS.GET_TASKS, {
    params: {
      status: filterData === "All" ? "" : filterData,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    },
  });
  return data;
};

export const getAllTaskByIdService = async (id: string) => {
  const { data } = await axiosInstance.get(`${apiPaths.TASKS.GET_TASKS}/${id}`);
  return data;
};
export const updateTaskByIdService = async (id: string, payload: any) => {
  const { data } = await axiosInstance.patch(
    `${apiPaths.TASKS.GET_TASKS}/${id}`,
    payload
  );
  return data;
};
export const deleteTaskByIdService = async (id: string) => {
  const { data } = await axiosInstance.delete(
    `${apiPaths.TASKS.GET_TASKS}/${id}`
  );
  return data;
};
export const getTaskByIdService = async (id: string) => {
  const { data } = await axiosInstance.get(
    `${apiPaths.TASKS.GET_TASK_BY_ID}/${id}`
  );
  return data;
};
export const updateUserByIdService = async (id: string, formdata: any) => {
  const { data } = await axiosInstance.patch(
    `${apiPaths.AUTH.UPDATE_USER}/${id}`,
    {
      ...formdata,
    }
  );
  return data;
};
export const getUserDetailsByIdService = async (id: string) => {
  const { data } = await axiosInstance.get(
    `${apiPaths.USERS.GET_ALL_USERS}/${id}`
  );
  return data;
};
export const handleDownloadReportService = async () => {
  const data = await axiosInstance.get(
    `${apiPaths.DOWNLOAD_REPORT.DOWNLOAD_USER_REPORT}`,
    {
      responseType: "blob",
    }
  );
  return data;
};

export const updateTodoCheckListService = async (
  id: string | undefined,
  todoChecklist: any
) => {
  const { data } = await axiosInstance.patch(
    `${apiPaths.TASKS.UPDATE_TODOCHECKLIST}/${id}`,
    { todoChecklist }
  );
  return data;
};

export const createUserService = async (formdata: any) => {
  const { data } = await axiosInstance.post(apiPaths.USERS.CREATE_USER, {
    ...formdata,
  });
  return data;
};
