import sendEmail from '../config/sendEmail.js';
import UserModel from '../models/user.model.js';
import bcrypt from "bcryptjs";
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import generateAccessToken from '../utils/generateAccessToken.js';
import generateRefreshToken from '../utils/generateRefreshToken.js';

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


// login controller
export async function loginController(req, res) {
    try {

        const {email , password}= req.body;

         if (!email || !password) {
            return res.status(400).json({
                message: "Email and password required",
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({email});

        if(!user){
            return res.status(400).json({
                message: "User not register",
                error: true,
                success:false
            });
        }

        if(user.status !="Active"){
            return res.status(400).json({
                message:"Contact to admin",
                error: true,
                success: false
            })
        }

        const checkPassword= await bcrypt.compare(password, user.password);

        if(!checkPassword){
            return res.status(400).json({
                message:"Check your password",
                error: true,
                success: false
            })
        }
        
        const accessToken = generateAccessToken(user._id);
        const refreshToken= generateRefreshToken(user._id);

        const cookiesOption = {
            httpOnly : true,
            secure: false,
            sameSite: "LAX"
        }

        res.cookie('accessToken',accessToken,cookiesOption);
        res.cookie('refreshToken',refreshToken,cookiesOption);

        return res.json({
            message: "Login successfully",
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken
            }
        })


    } catch (error) {
        console.error("LOGIN ERROR:", error); 
        return res.status(500).json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
    
}
 // logout controller
export async function logoutController(req,res) {
    try {
          const cookiesOption = {
            httpOnly : true,
            secure: false,
            sameSite: "LAX"
        }

        res.clearCookie(accessToken,cookiesOption);
        res.clearCookie(refreshToken,cookiesOption);

        return res.json({
            message:"logout Successfully",
            error: false,
            success: true
        })

        
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
}