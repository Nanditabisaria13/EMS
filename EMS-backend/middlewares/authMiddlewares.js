const jwt = require('jsonwebtoken')

module.exports.authEmployee = async(req,res,next)=>{
    try {
      const {token} =  req.cookies.token || req.headers

      if(!token){
        return res.status(400).json({success:false,message:"Not Authorized Login Again!"})
      }

      const token_decode = jwt.verify(token, process.env.JWT_SECRET)
      req.body.employeeId = token_decode.id
       next()
       
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:error.message})
    }
}

module.exports.authAdmin = async(req,res,next)=>{

   try {
     const {atoken} =  req.cookies.token || req.headers
     
     if(!atoken){
      return res.status(400).json({success:false, message:"Not Authorized Login Again!"})
     }
     
     const decode_atoken = jwt.verify(atoken,process.env.JWT_SECRET)
     req.adminId = decode_atoken.id
    
       next()


   } catch (error) {
    console.log(error)
    res.status(500).json({success:false,message:'token is invalid'})
   }

}
