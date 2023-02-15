import { Request, Response, NextFunction } from 'express'
import Productmodel from '../models/product.model'

const product = new Productmodel()

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productt = await product.create(req.body)
    res.json({
      data: { ...productt }
    })
  } catch (err) {
    next(err)
  }
}

export const index = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const productt = await product.index()
    res.json({
      data: productt
    })
  } catch (err) {
    next(err)
  }
}

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productt = await product.show(req.params.id as unknown as number)
    res.json({
      data: productt
    })
  } catch (err) {
    next(err)
  }
}

export const delet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productt = await product.delete(req.params.id as unknown as number)
    res.json({
      data: productt
    })
  } catch (err) {
    next(err)
  }
}
