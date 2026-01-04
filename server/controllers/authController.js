import dotenv from "dotenv";
import User from "../models/user.js"
dotenv.config();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"


export const register = async (req, res) => {
    try {
        const {UserName ,
            email ,
            password,
            ConfirmPassword
        } = req.body;

        if(!UserName ||
            !email || 
            !password || 
            !ConfirmPassword
        ){
            return res.status(403).json({
                message : "please fill all required fields",
                success : false
            });
        }

        if (password != ConfirmPassword) {
            return res.status(400).json({
            success: false,
            message: "password and confirmPassword does not match",
      });
    }
    const existingUser = await User.findOne({email});

    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "user already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      name : UserName,
      email : email,
      password: hashedPassword,
    });
    const payload = {
      email : user.email,
      id : user._id

    }
    const token = jwt.sign(
    payload,           // payload
    process.env.JWT_SECRET,         // secret
    { expiresIn: "36d" }              // expiry
    ); 
    // localStorage.setItem("token", data.token);

    return res.status(200).json({
      success : true , 
      message : "user registered successfully",
      token,
      user : {
        id: user._id,
        email: user.email,
        UserName : user.name
      }
    });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
        success : false,
        message : "try again later"
        })
    }
    
};

export const login = async (req, res) => {
    try {
        //fetch data 
    const {email , password} = req.body

    //validation

    if(!email || !password){
      return res.status(403).json({
        success : false,
        message : "all fields required"
      })
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
      return res.status(400).json({
        success : false , 
        message : "user does not exist , please register first"
      })
    }
    const isMatch = await bcrypt.compare(password , user.password);
    if(!isMatch){
        return res.status(403).json({
            success : false,
            message : "invalid credentials"
        })
    }
    const payload = {

      email : user.email,
      id : user._id,
    }
    const token = jwt.sign(
    payload,           // payload
    process.env.JWT_SECRET,         // secret
    { expiresIn: "36d" }              // expiry
    );
    // localStorage.setItem("token", data.token);
    return res.status(200).json({
        success : true,
        token,
        user : {
            id: user._id,
            email: user.email,
            UserName: user.UserName,
        },
        message : "logged in successfully"
    })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
        success : false,
        message : "try again later"
        })
    }
};
