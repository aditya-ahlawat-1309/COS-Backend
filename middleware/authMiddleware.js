const jwt = require("jsonwebtoken");
const {User} = require("../Database/schema");

const protect = async(req,res,next) => {
    let token;

    if(req.headers.autorization &&
        req.headers.autorization.startsWith("Bearer")
        ) 
        {
            try{
                token = req.headers.authorization.split(" ")[1].split(":")[0];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await User.findById(decoded.id).select("-password");
                next();
            }
            catch(err)
            {
                res.status(401);
                throw new Error("Not authorized token fialed");
            }
        }
if(!token)
{
    res.status(401);
    throw new Error("Not authorized, no token");
}        
}

module.exports = {protect};