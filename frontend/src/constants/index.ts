export const BASE_URL  = "http://localhost:3000/api/v1"
export const RENDER_URL = "https://task-manager-backend-cnfm.onrender.com"

export const apiPaths = {
     AUTH : {
        LOGIN : "/auth/login",
        REGISTER : "/auth/register",
        UPDATE_USER : "/auth"
     },
     IMAGE : {
         UPLOAD_IMAGE : "/auth/upload-image"
     },
     TASKS : {
            GET_DASHBOARD_DATA : "/task/dashboard",
            CREATE_TASK : "/task",
            GET_TASKS : "/task",
            GET_USER_DASHBOARD_DATA : "/task/user",
            GET_TASK_BY_ID : "/task",
            UPDATE_TODOCHECKLIST : "/task/todo"
     } ,
     USERS : {
        GET_ALL_USERS : "/user" ,
        CREATE_USER : "/user/create"
     },
     DOWNLOAD_REPORT : {
         DOWNLOAD_USER_REPORT : "/report/export/user"
     }
}