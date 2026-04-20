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
  static notFound(message="notfound"){
    return new ApiError(404,message)
  }
  static conflict(message="conflict"){
    return new ApiError(409,message)
  }
  static unauthorized(message="unauthorized"){
    return new ApiError(401,message)
  }
  static ServerError(message="Servererror"){
  return new ApiError(500,message)
  }

}

export default ApiError