import ApiResponse from '../common/utils/response.js'
import ApiError from '../common/utils/error.js'
import AuthService from './auth.service.js'
const register=async(req,res)=>{
try {
   const user= await AuthService.register(req.body) 
   ApiResponse.created(res,'user is created',user)
} catch (error) {
throw ApiError.ServerError(`internal server error${error.message}`)
}
}

export {
    register
}