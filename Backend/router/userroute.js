var Router = require('router');
var router = Router();
var middleware=require('../middleware/checkauth');
var usercontroller=require('../controller/usercontroller');

router.post('/signup',usercontroller.signup);
router.get('/logout',usercontroller.logout);
router.post('/login',usercontroller.login)
router.post('/forgot',usercontroller.forgotpass);
router.post('/changepass/:token',usercontroller.changepass);
router.put('/updateuser',middleware.islogin,usercontroller.updateuser);
router.get('/userdetail',middleware.islogin,usercontroller.getuserdetail);
router.post('/updatepass',middleware.islogin,usercontroller.updatepass);
router.post('/create-reviews/',middleware.islogin,usercontroller.createreviews);


module.exports=router;