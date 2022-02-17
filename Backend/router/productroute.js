var Router = require('router');
var router = Router();
var productcontroller=require('../controller/productcontroller');

router.get('/products',productcontroller.getallproduct);
router.get('/getone-product/:id',productcontroller.getoneproduct);
router.get('/getone-product-reviews/:id',productcontroller.getreviews);

module.exports=router;