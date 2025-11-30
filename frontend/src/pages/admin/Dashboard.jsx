import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { useSelector } from 'react-redux'

const Dashboard = () => { 
  const {user} = useSelector((state)=>state.auth)

  console.log(user , "user")
  return <DashboardLayout>
       Dashboard Side
    </DashboardLayout>
  
}

export default Dashboard