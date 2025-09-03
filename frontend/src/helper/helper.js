export const validateEmail=(email)=>{
        const trimEmail = email.trim()
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          return regex.test(trimEmail)
}

export const validatePassword = (password)=>{
       const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
       return regex.test(password)
    }