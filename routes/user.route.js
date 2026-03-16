
import { Router } from 'express';
import {registerUserControllers} from '../controllers/user.controller.js';
let userRouter= Router();
  

userRouter.post("/register" , registerUserControllers);

export default userRouter;