import sendEmail from '../config/sendEmail.js';
import UserModel from '../models/user.model.js';
import bcrypt from "bcryptjs";
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';

export async function registerUserControllers(req,res) {
    try {
        const{ name, email, password}= req.body;

        if(! name || !email || !password){
            return res.status(500).json({
                messsage: "provide name email password ",
                error: true,
                success: false
            })
        }
        let user= await UserModel.findOne({email});
        if(user){
            return res.json({
                messsage: "Already register",
                error:true,
                success:false,
            })
        }
        const salt =  bcrypt.genSaltSync(10);
        const hash =  bcrypt.hashSync(password, salt);

        const payload= {
            name, email,
            password: hash,
            role: "USER"
        }
        let newUser= new UserModel(payload);
        let save= await newUser.save();

        let verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email/${save._id}`;

         await sendEmail({
            tosend: email,
            subject: "Verify email from Servme",
            html: verifyEmailTemplate({
                name,
                url: verifyEmailUrl,
            })
        });

        return res.json({
            message:"user register successfully",
            error: false,
            success:true,
            data: save
        })
        
        
    } catch (error) {
        return res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
} 