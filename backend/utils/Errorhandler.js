


export const errorhandler = (error , req , res , next)=>{
      return res.status(500).json({
        success : false,
        message : error?.message??"Internal server error"??"Something went wrong"
      })
}