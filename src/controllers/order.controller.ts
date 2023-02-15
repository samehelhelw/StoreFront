import { Request, Response } from 'express'
import OrderModel from '../models/order.model'

const order = new OrderModel()

export const create = async (req: Request, res: Response) => {
  try {
    const orderr = await order.create(req.body)

    res.json({
      data: { ...orderr }
    })
  } catch (error) {
    throw error
  }
}

export const index = async (req: Request, res: Response) => {
  try {
    const orderr = await order.index()
    res.json({
      data: { ...orderr }
    })
  } catch (error) {
    throw error
  }
}

export const show = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const order1 = await order.show(id)
    res.json({
      data: { ...order1 }
    })
  } catch (error) {
    throw error
  }
}

export const addorderproduct = async (req: Request, res: Response) => {
  try {
    const addProductToOrderr = await order.addorder_product(
      req.body.orderId,
      req.body.productId,
      req.body.quantity
    )
    res.json({
      data: { ...addProductToOrderr }
    })
  } catch (error) {
    throw error
  }
}

export const getorderproduct = async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.id)
    const result = await order.getorder_product(orderId)
    res.json({
      data: { ...result }
    })
  } catch (error) {
    throw error
  }
}
