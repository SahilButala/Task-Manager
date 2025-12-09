import { apiPaths } from "../constants"
import axiosInstance from "../utils/axiosInstance"


export const LoginService = async(formdata)=>{
     const {data} = await axiosInstance.post(apiPaths.AUTH.LOGIN  , {...formdata})
  return data
}

export const RegisterService = async (formdata)=>{
   const {data} = await axiosInstance.post(apiPaths.AUTH.REGISTER , {...formdata})
   return data
}

export const getAllUsersService = async ()=>{
   const {data} = await axiosInstance.get(apiPaths.USERS.GET_ALL_USERS)

   return data
  
}