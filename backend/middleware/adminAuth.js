import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        const {token} = req.headers
        if(!token){
            return res.json({ success: false, message: "Not Authorized login again" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
if (decoded.email !== process.env.ADMIN_EMAIL || decoded.password !== process.env.ADMIN_PASSWORD) {
  return res.json({ success: false, message: "Not Authorized login again" });
}

        next();
        


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
export default adminAuth;