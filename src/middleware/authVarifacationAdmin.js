const { DecodeToken } = require('../utility/tokenHelper'); 

module.exports = (req, res, next) => {
  
    let token = req.cookies['a_token'];
     //let token = req.headers.authorization?.split(" ")[1];
    //console.log("TOKEN:", token);
    let decoded = DecodeToken(token);

    if (decoded === null) {
        return res.status(401).json({
            status: "fail",
            message: 'Unauthorized: Invalid or missing token'
        });
    } else {
        let email = decoded['email']
        let _id = decoded['_id']

       
        req.headers.email = email;
        req.headers._id = _id; 

     
        next();
    } 
};



/**const { DecodeToken } = require('../utility/tokenHelper'); 

module.exports = (req, res, next) => {

    // 🔥 শুধু এইটা রাখ
    console.log("AUTH HEADER:", req.headers.authorization);
    let token = req.headers.authorization?.split(" ")[1];

    console.log("AUTH HEADER:", req.headers.authorization);
    console.log("TOKEN:", token);

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided"
        });
    }

    let decoded = DecodeToken(token);

    console.log("DECODED:", decoded);

    if (!decoded) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }

    // 🔥 IMPORTANT
    req.user = decoded;

    next();
}; **/


/**const { DecodeToken } = require('../utility/tokenHelper');

module.exports = (req, res, next) => {
    console.log("🔥 AUTH MIDDLEWARE চলছে...");   // ← এটা অবশ্যই দেখতে হবে

    let token = req.cookies?.['a_token'];

    if (!token && req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
    }

    console.log("Token পাওয়া গেছে?", token ? "হ্যাঁ" : "না");

    if (!token) {
        return res.status(401).json({ success: false, message: "No token" });
    }

    const decoded = DecodeToken(token);

    if (decoded === null) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }

    req.user = { email: decoded.email, _id: decoded._id };

    console.log("✅ Middleware Success, req.user =", req.user.email);
    next();
};**/






























