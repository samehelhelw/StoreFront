import { Router, Request, Response } from 'express'
import * as controller from '../controllers/user.controller'
import authMiddleware from '../middleware/auth.middleware'

const router = Router()

router.post('/create', controller.create)
router.post('/auth', controller.authenticate)
router.get('/index', authMiddleware, controller.index)
router.get('/show/:id', controller.show)
router.get('/update/:id', controller.update)

export default router
