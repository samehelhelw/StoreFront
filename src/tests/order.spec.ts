import client from '../index.database'
import User from '../types/user.types'
import OrderModel from '../models/order.model'
import { Order } from '../types/order.types'
import ProductModel from '../models/product.model'

import UserModel from '../models/user.model'

const orderModel = new OrderModel()
const productModel = new ProductModel()
const userModel = new UserModel()

describe('orderModel Test', () => {
  describe(' Test  Exsist', () => {
    it('Should  create ', () => {
      expect(orderModel.create).toBeDefined()
    })

    it('==> Should  show .', () => {
      expect(orderModel.show).toBeDefined()
    })

    it('==> Should  index  .', () => {
      expect(orderModel.index).toBeDefined()
    })

    it('==> Should add product to order .', () => {
      expect(orderModel.addProductToOrder).toBeDefined()
    })

    it('==> Should get product in order .', () => {
      expect(orderModel.getProductsOnOrder).toBeDefined()
    })
  })
})

describe('Create Order Test ', () => {
  const product = {
    name: 'test',
    price: 100,
    category: 'test'
  }

  const order = {
    user_id: 1,
    product_id: 1,
    status: 'active'
  } as unknown as Order

  const user = {
    user_name: 'samehelehelw',
    first_name: 'sameh',
    last_name: 'elhelw',
    password: 'test'
  } as unknown as User

  beforeAll(async () => {
    const createdProduct = await productModel.create(product)
    const createdOrder = await orderModel.create(order)
    const createdUser = await userModel.create(user)
  })

  afterAll(async () => {
    const connection = await client.connect()
    const sql = `DELETE FROM orders where user_id = '${order.user_id}';`
    const sqll = `DELETE FROM users where user_name = '${user.user_name}'`
    const res = await connection.query(sql)
    const ress = await connection.query(sqll)
    connection.release()
  })

  it(' return  order', async () => {
    const result = await orderModel.index()
    expect(result.length).toBeGreaterThan(0)
  })
})
