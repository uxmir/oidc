import ApiResponse from "../common/utils/response.js";
import ApiError from "../common/utils/error.js";
import AuthService from "./auth.service.js";
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { pem2jwk } from "pem-jwk";
const register = async (req, res) => {
  try {
    const user = await AuthService.register(req.body);
    ApiResponse.created(res, "user is created", user);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const {user,token} = await AuthService.login(req.body);
    ApiResponse.ok(res, "user is loggod in", {user,token});
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

const getJwks=async(req,res)=>{
    const publicKey=fs.readFileSync(path.join(process.cwd(),'certs','public.pem'),'utf-8')

    const jwk= pem2jwk(publicKey)
    const jwts={
        ...jwk,
        kid:'mir-auth-key-1',
        use:'sig',
        alg:'RS256',
        kty:'RSA'
    }
    return res.json(jwts)
}
export { register,login,getJwks };
