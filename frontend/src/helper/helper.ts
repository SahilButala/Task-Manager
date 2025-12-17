export const validateEmail=(email : string)=>{
        const trimEmail = email.trim()
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          return regex.test(trimEmail)
}

export const validatePassword = (password : string)=>{
       const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
       return regex.test(password)
    }

export const addThousandsSeprator = (num : number)=>{
   if(num == null || isNaN(num)) return ""

   const [integralPart , fractionalPart] = num.toString().split(".")

   const formattedInteger = integralPart.replace(/\B(?=(\d{3})+(?!\d))/g , ",")
   return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger
}