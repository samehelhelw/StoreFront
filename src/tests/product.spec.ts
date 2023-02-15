import client from '../index.database'
import ProductModel from '../models/product.model'
import Product from '../types/product.types'
const productModel = new ProductModel()

describe('productModel Test .', () => {
  describe('Test Exsist', () => {
    it('Should  method', () => {
      expect(productModel.create).toBeDefined()
    })

    it('Should  show  .', () => {
      expect(productModel.show).toBeDefined()
    })

    it('Should index .', () => {
      expect(productModel.index).toBeDefined()
    })
  })
})

describe('Create Product Test ', () => {
  const product = {
    name: 'test Product',
    price: 404,
    category: 'Lap'
  } as unknown as Product

  beforeAll(async () => {
    const connection = await client.connect()
    const sql = `DELETE FROM product;`
    await connection.query(sql)
    connection.release()
    const createdProduct = await productModel.create(product)
  })
})
