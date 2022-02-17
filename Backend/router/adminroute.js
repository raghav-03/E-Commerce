var Router = require('router');
var router = Router();
var middleware=require('../middleware/checkauth');
var admincontroller=require('../controller/admincontroller');

// For User

router.get('/getalluser',middleware.isadmin,admincontroller.getalluser);
router.get('/getuser/:id',middleware.isadmin,admincontroller.getoneuser);
router.put('/getuser/:id',middleware.isadmin,admincontroller.updaterole);
router.delete('/getuser/:id',middleware.isadmin,admincontroller.deleteuser);


// For Product
router.get('/getallproduct',middleware.isadmin,admincontroller.getAdminProducts)
router.post('/create-product',middleware.isadmin,admincontroller.addproduct);
router.put('/update-product/:id',middleware.isadmin,admincontroller.updateproduct);
router.delete('/delete-product/:id',middleware.isadmin,admincontroller.deleteproduct);
router.delete('/delete-review',middleware.isadmin,admincontroller.deletereviews);

module.exports=router;