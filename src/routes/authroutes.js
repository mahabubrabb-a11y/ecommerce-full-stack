const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers');

// test route
router.get('/test', (req, res) => {
  res.send('Auth route working ');
});


//  register route add 
router.post('/admin-register', adminController.register);


// login route add
router.post('/admin-login', adminController.login);


//admin route add
router.get('/admin', adminController.admin); 


//admin verify
router.get('/adminVerify', adminController.adminVerify)

//admin logout
router.get('/adminLogout',  adminController.logout)

module.exports = router;