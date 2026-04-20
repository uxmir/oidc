class ApiError extends Error{
  constructor(statusCode,message){
  super(message)
  this.statusCode=statusCode;
  this.isOperational=true
  Error.captureStackTrace(this,this.constructor)
  }
  static badRequest(message="badrequest") {
    return new ApiError(400,message)
  } 
  static ServerError(message="Servererror"){
  return new ApiError(500,message)
  }
}

export default ApiError