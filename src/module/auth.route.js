import { Router } from "express";
import AuthController from './auth.controller.js'
const router =Router()

router.post('/create',AuthController.register)

export default router