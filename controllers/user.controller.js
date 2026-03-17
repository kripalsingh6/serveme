import sendEmail from '../config/sendEmail.js';
import UserModel from '../models/user.model.js';
import bcrypt from "bcryptjs";
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';

export async function registerUserControllers(req,res) {
    try {
        const{ name, email, password}= req.body;

        if(! name || !email || !password){
            return res.status(500).json({
                message: "provide name email password ",
                error: true,
                success: false
            })
        }
        let user= await UserModel.findOne({email});
        if(user){
            return res.json({
                message: "Already register",
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

export async function verifyEmailController(req,res) {
    try {

        const {code}= req.body;

        let user= new UserModel.findById({_id : code});

        if(!user){
            return res.status(400).json({
                message: "Invalid Code",
                error: true,
                success:false,
            })
        }
        const updateUser= await UserModel.updateOne({_id: code},{verify_email:true});

        return res.json({
            message:"Verify Email Done",
            success:true,
            error:false
        });


        
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: true,
        });
    }
    
}

export async function loginController(req, res) {
    try {

        let {email , password}= req.body;

        let user = await UserModel.findOne({email});

        if(!user){
            return res.status(400).json({
                message: "User not register",
                error: true,
                success:false
            });
        }
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
    
}