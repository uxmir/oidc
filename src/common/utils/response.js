class ApiResponse {
  static ok(res, message, data = null) {
    return res.status(200).json({
      data,
      success:true,
      message,
    });
  }
  static created(res, message, data = null) {
    return res.status(201).json({
      data,
      success:true,
      message,
    });
  }
}

export default ApiResponse;
