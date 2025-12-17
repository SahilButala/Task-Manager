export const BASE_URL  = "http://localhost:3000/api/v1"

export const apiPaths = {
     AUTH : {
        LOGIN : "/auth/login",
        REGISTER : "/auth/register"
     },
     IMAGE : {
         UPLOAD_IMAGE : "/auth/upload-image"
     },
     TASKS : {
            GET_DASHBOARD_DATA : "/task/dashboard",
            CREATE_TASK : "/task",
            GET_TASKS : "/task"
     } ,
     USERS : {
        GET_ALL_USERS : "/user" 
     },
     DOWNLOAD_REPORT : {
         DOWNLOAD_USER_REPORT : "/report/export/user"
     }
}