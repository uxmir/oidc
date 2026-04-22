import { Router } from "express";
import AuthController from './auth.controller.js'
const router =Router()

router.post('/register',AuthController.register)
router.post('/login',AuthController.login)
router.get('/jwk.json',AuthController.getJwks)
router.get('well-known/openid-configuration',AuthController.getDiscovery)
export default router 