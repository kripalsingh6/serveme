
import { Router } from 'express';
import {registerUserControllers,verifyEmailController,loginController} from '../controllers/user.controller.js';
let userRouter= Router();
  

userRouter.post("/register" , registerUserControllers);
userRouter.post("/verify-email",verifyEmailController);
userRouter.post("/login",loginController );

export default userRouter;