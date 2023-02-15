import client from '../index.database'
import { Order, OrderProducts } from '../types/order.types'
import Product from '../types/product.types'

export class Ordermodel {
  async create(order: Order): Promise<Order> {
    try {
      const connection = await client.connect()
      const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING * ;'

      const result = await connection.query(sql, [order.user_id, order.status])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldn't get orders because of ${(error as Error).message}`)
    }
  }

  async addorder_product(
    orderId: number,
    productId: number,
    quantity: number
  ): Promise<OrderProducts> {
    try {
      const connection = await client.connect()
      const sql = 'SELECT * FROM orders WHERE id=($1)'

      const res = await connection.query(sql, [orderId])
      console.log(res.rows[0])
      const sqlInsert = `INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *`
      const result = await connection.query(sqlInsert, [orderId, productId, quantity])

      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldn't get orders because of ${error}`)
    }
  }

  async getorder_product(orderId: number): Promise<Product[]> {
    try {
      const connection = await client.connect()

      const sql =
        'SELECT products.* FROM order_products JOIN products ON order_products.product_id = products.id WHERE order_id=($1)'
      const result = await connection.query(sql, [orderId])
      return result.rows
    } catch (error) {
      throw new Error(`Couldn't get orders because of ${error}`)
    }
  }

  async index(): Promise<Order[]> {
    try {
      const connection = await client.connect()

      const result = await connection.query('SELECT * FROM orders')
      connection.release()

      return result.rows
    } catch (error) {
      throw new Error(`Couldn't get orders because of ${error}`)
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const connection = await client.connect()
      const result = await connection.query('SELECT * FROM orders where user_id=($1)', [id])

      connection.release()

      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldn't get orders because of ${error}`)
    }
  }
}

export default Ordermodel
