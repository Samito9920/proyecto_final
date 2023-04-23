const express = require('express');
const app = express();
const router = express.Router()
const registroRouter = require('./registro')
const authRouter = require('./authen')
const userRouter = require('./userApi')
const authMiddleware = require('../middleware/authorization')

router.use('/login',authRouter)
router.use('/registro', registroRouter)


router.use(authMiddleware)
router.use('/users',userRouter)

module.exports = router

