import { Router } from 'express'
import * as controller from '../controllers/order.controller'

const router = Router()

router.post('/create', controller.create)
router.get('/index', controller.index)
router.get('/show/:id', controller.show)

router.post('/addProduct', controller.addorderproduct)
router.get('/getProduct/:id', controller.getorderproduct)

export default router
