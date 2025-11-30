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