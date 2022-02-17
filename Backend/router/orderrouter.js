var Router = require('router');
var router = Router();
var middleware=require('../middleware/checkauth');
var usercontroller=require('../controller/usercontroller');
var ordercontroller=require('../controller/ordercontroller')

router.post('/placeorder',middleware.islogin,ordercontroller.addorder);
router.get('/seeoneorder/:id',middleware.islogin,ordercontroller.seeoneorder);
router.get('/seeallorder',middleware.isadmin,ordercontroller.getallorder);
router.put('/updateorder/:id',middleware.isadmin,ordercontroller.updatestatus);
router.delete('/deleteorder/:id',middleware.isadmin,ordercontroller.deleteorder);
router.get('/myorder',middleware.islogin,ordercontroller.myorder);
router.delete('/cancelorder/:id',middleware.islogin,ordercontroller.cancelorder);

module.exports=router;