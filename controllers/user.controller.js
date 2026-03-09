import UserModel from '../models/user.model.js';

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
        
    } catch (error) {
        return res.status(500).json({
            messsage: error.messsage || error,
            error: true,
            success: false,
        });
    }
} 