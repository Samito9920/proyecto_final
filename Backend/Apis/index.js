const express = require('express');
const app = express();
const router = express.Router()
const registroRouter = require('./registro')
const authRouter = require('./authen')
const authMiddleware = require('../middleware/authorization')
const userRouter = require('./userApi')
const productRouter = require('./proudctApi')

router.use('/login',authRouter)
router.use('/registro', registroRouter)
router.use('/product', productRouter);



router.use(authMiddleware)
router.use('/users',userRouter)

module.exports = router

