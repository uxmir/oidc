import User from "../module/auth.model.js";
import ApiResponse from "../common/utils/response";
import ApiError from "../common/utils/error";
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
const privateKey=fs.readFileSync(path.join(process.cwd(),'certs','private.pem'),'utf-8')
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

const login=async({email,password})=>{
  try {
    if(!email || !password) throw ApiError.notFound("something is missing");
    const user = await User.findOne({ email });
      if (!user) throw ApiError.conflict("this email has been registered");
      const ismatch=await user.comparePassword(password)
       if(!ismatch) throw ApiError.conflict("password is not matching");
       const payload={
        sub:user._id,
        email:user.email,
        name:`${user.firstName} ${user.lastName}`,
        iat:Math.floor(Date.now()/1000)
       }
       const token=jwt.sign(payload,privateKey,{
        algorithm:'RS256',
        expiresIn:'1h',
        issuer:'mir-auth-server',
        keyid:'mir-auth-key-1'
       })
       return {user,token}
  } catch (error) {
    throw ApiError.ServerError(`internal server error${error.message}`);
  }
}


export { register,login };
