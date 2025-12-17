import { apiPaths } from "../constants";
import axiosInstance from "./axiosInstance";


export const uploadImage  = async (imageFile : string)=>{
  const formdata = new FormData()

  if(formdata){
        formdata.append("file" , imageFile)
  }


  try {
    const res = await axiosInstance.post(apiPaths?.IMAGE?.UPLOAD_IMAGE,formdata,{
        headers : {
            "Content-Type"  :"multipart/form-data"
        }
    })
    return res.data
  } catch (error : any) {
    console.log("error to upload image",error.message)
  }
}