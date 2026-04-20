import User from "../module/auth.model.js";
import ApiResponse from "../common/utils/response";
import ApiError from "../common/utils/error";
const register = async ({ firstName, lastName, email, password }) => {
  try {
    if (!firstName || !lastName || !email || !password)
      throw ApiError.notFound("something is missing");
    const exist = await User.findOne({ email });
    if (exist) throw ApiError.conflict("this email has been registered");
    const createUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      verifiedEmail: false,
    });
    return createUser;
  } catch (error) {
    throw ApiError.ServerError(`internal server error${error.message}`);
  }
};

export { register };
