
const adminModel = require('../models/adminModels')
const bcrypt = require('bcrypt'); 
const { EncodeToken } = require('../unity/tokenHelper')

let options = {
    //maxAge: process.env.Cookie_Expire_Time,
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path : '/'
};



//admin register
exports.register= async (req, res) =>{
    try {
         const {email, password} = req.body
         await adminModel.create({email, password})
           res.status(200).json({
      success: true,
      message: 'Register API working ',
    });
    } catch (error) {
        res.status(500).json({ 
            success : false,
            error : error.toString(),
            Message : "some wrong",
        }); 
    }
} 



// admin login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await adminModel.findOne({ email });
        if (!user) {
            return res
                .status(200)
                .json({ success: false, message: "Invalid email or password" });
        }

        // isMatch password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(200)
                .json({ success: false, message: "Invalid email or password" });
        }

        if (isMatch) {
            let token = EncodeToken(user.email, user._id.toString());
            
            //cookies set
            res.cookie('a_token', token, options)

              return res.status(200).json({
        success: true,
        message: "Login successful",
        user:{
            id : user._id,
            email : user.email
        },
        token: token
           });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.toString(),
            message: "Something went wrong.",
        });
    }
};



//admin
/**exports.admin = async(req, res) => {
    try {
        let email = req.headers.email
        console.log(email)
        let id = req.headers._id
        let user = await adminModel.findOne({ email }).select('-password');
         let matchStage = {
            $match : {email}
        }

        let project = {
            $project : {password : 0}
        } 
        let data = await adminModel.aggregate([matchStage, project])

        return res.status(200).json({
         success: true,
         message: "Admin data fetched",
         data: user,

           user: {
                id: user._id,
                email: user.email
            }

          });
        console.log(data)
          return res.status(200).json({
            success: true,
            message: "Admin route working",
            email: email
        });
    } catch (error) {
         res.status(500).json({
            success: false,
            error: error.toString(),
            message: "Something went wrong.",
        });
    }
} **/
/**exports.admin = async (req, res) => {
    try {

        console.log("USER:", req.user); // 👈 debug

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not authorized"
            });
        }

        let email = req.user.email;
        let id = req.user._id;

        console.log("EMAIL:", email);
        console.log("ID:", id);

        let user = await adminModel.findOne({ email }).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            });
        }

        return res.status(200).json({
            success: true,
            user: {
                id: user._id,
                email: user.email
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.toString(),
            message: "Something went wrong.",
        });
    }
};**/

exports.admin = (req, res) => {
    try {
         let email = req.headers.email
        console.log(email)
        
    } catch (error) {
         return res.status(500).json({
            success: false,
            error: error.toString(),
            message: "Something went wrong.",
        });
    }
}



  




//admin Verify
exports.adminVerify = async(req, res)=>{
    try {
        res.status(200).json({success:true})
    } catch (error) {
          res.status(500).json({
            success: false,
            error: error.toString(),
            message: "Something went wrong.",
        });
    }
}


// admin logout
exports.logout = async(req, res) =>{
    try {

        
       res.clearCookie('a_token', options);
        res.status(200).json({success:true, message: 'logout success'})
    } catch (error) {
           res.status(500).json({
            success: false,
            error: error.toString(),
            message: "Something went wrong.",
        });
    }
} 