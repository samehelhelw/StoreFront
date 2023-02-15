import client from '../index.database'
import Product from '../types/product.types'

export class Productmodel {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT id, name, price, category FROM product'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Couldn't get products because of ${error}`)
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT id, name, price, category FROM product WHERE id =($1)'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldn't get product with this id : ${id}=> ${error}`)
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const conn = await client.connect()
      const sql = 'INSERT INTO product (name, price, category) VALUES ($1, $2, $3) RETURNING *; '

      const result = await conn.query(sql, [product.name, product.price, product.category])

      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldn't add new product => ${error}`)
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const conn = await client.connect()
      const sql = 'DELETE FROM product WHERE id=($1)'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not delete this product => ${error}`)
    }
  }
}

export default Productmodel
