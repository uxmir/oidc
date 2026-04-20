import express from 'express'
const app=express()
import AuthRoute from '../src/module/auth.route'
app.use(express.json())
app.use('/o/authenticate',AuthRoute)
export default app