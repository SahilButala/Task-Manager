


export const catchAsync = (controller)=> (req,res,next)=>{
      try {
          return controller(req,res,next)
      } catch (error) {
          console.log(error)
          return  res.status(500).json({
              message :  error?.message??"Internal Server Errror"??"Something went wrong"
          })
      }
}