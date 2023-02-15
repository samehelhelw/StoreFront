import express, { Router, Request, Response } from 'express'
import * as controller from '../controllers/product.controller'

const router = Router()

router.post('/create', controller.create)
router.get('/index', controller.index)
router.get('/show/:id', controller.show)
router.delete('/delete/:id', controller.delet)

export default router
