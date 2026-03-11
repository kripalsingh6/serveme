import sendEmail from '../config/sendEmail.js';
import UserModel from '../models/user.model.js';
import bcrypt from "bcryptjs";

export async function registerUserControllers(req,res) {
    try {
        const{ name, email, password}= req.body;

        if(! name || email || password){
            return res.status(500).json({
                messsage: "provide name email password ",
                error: true,
                success: false
            })
        }
        let user= UserModel.findOne({email});
        if(user){
            return res.json({
                messsage: "Already register",
                error:true,
                success:false,
            })
        }
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(password, salt);

        const payload= {
            name, email,
            password: hash,
        }
        let newUser= new UserModel(payload);
        let save= newUser.save();

        let VerifyEmail= await sendEmail({
            sendTo:email,
            subject: "Verify email from Servme",
            html,
        })
        
        
    } catch (error) {
        return res.status(500).json({
            messsage: error.messsage || error,
            error: true,
            success: false,
        });
    }
} 