import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import Usermodel from '../models/user.model'
import config from '../config'

const user = new Usermodel()

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userr = await user.create(req.body)
    console.log(req.body)
    res.json({
      data: { ...userr }
    })
  } catch (err) {
    next(err)
  }
}

export const index = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const userr = await user.index()
    res.json({
      data: userr
    })
  } catch (err) {
    next(err)
  }
}

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userr = await user.show(req.params.id as unknown as number)
    res.json({
      data: userr
    })
  } catch (err) {
    next(err)
  }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userr = await user.update(req.body)
    res.json({
      data: userr
    })
  } catch (err) {
    next(err)
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_name, password } = req.body

    const userr = await user.authenticate(user_name, password)
    const token = jwt.sign({ userr }, config.tokenSecret as unknown as string)
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'the username and password not correct please try again'
      })
    }
    return res.json({
      status: 'success',
      data: { ...userr, token },
      message: 'user  successfully authed'
    })
  } catch (err) {
    return next(err)
  }
}
