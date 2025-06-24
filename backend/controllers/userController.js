import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";

const createToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


//route for user login
const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if(!user){
            return res.json({ success: false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
  const token = createToken(user._id);
  res.json({ success: true, token, user: { _id: user._id, name: user.name, email: user.email } });
} else {
  res.json({ success: false, message: "Invalid credentials" }); 
}

    }catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


//route for user registration
const registerUser = async (req, res) => {
   try{

    const {name,email,password} = req.body;
    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if(exists){
        return res.json({ success: false, message: "user already exists" });
    }

    //validating email format
    if(!validator.isEmail(email)){
        return res.json({ success: false, message: "Invalid email format" });
    }
    if(password.length < 8){
        return res.json({ success: false, message: "Password must be at least 8 characters long" });
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
        name,
        email,
        password: hashedPassword
    });

    const user = await newUser.save()

    const token = createToken(user._id);

    res.json({ success: true, token,user: { _id: user._id, name: user.name, email: user.email }});

   }catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
      
   }
}

//route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(
  { email, password },
  process.env.JWT_SECRET,
  { expiresIn: '1d' }
);

            res.json({ success: true, token });
        }else{
            res.json({ success: false, message: "Invalid admin credentials" });
        }

        

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { loginUser, registerUser, adminLogin };