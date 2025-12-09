import React, { useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { initialcreateTaskData, Priority_Data } from '../../config'
import axiosInstance from '../../utils/axiosInstance'
import { apiPaths } from '../../constants'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { LuTrash2 } from 'react-icons/lu'



const CreateTask = () => {
  const [taskData, settaskData] = useState(initialcreateTaskData)

  const location  = useLocation()
  const {taskId} = location.state || {}

  const [currentTask, setcurrentTask] = useState(null)

  const [error, seterror] = useState('')
  const [isloading, setisloading] = useState(false)
  const [openDialogAlert, setopenDialogAlert] = useState(false)


  const handleValueChange = (key , val)=>{
settaskData((prev)=>({
  ...prev,
  [key] : val
}))
  }

  const clearData =()=>{
    
  }
  return (
    <DashboardLayout activeMenue={"Create Task"}>

    </DashboardLayout>
  )
}

export default CreateTask