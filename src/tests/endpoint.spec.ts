import supertest from 'supertest'
import app from '../index'
import client from '../index.database'

const req = supertest(app)

describe('EndPoints Test Suites', () => {
  it('test main page', async () => {
    const res = await req.get('/api/users/index')

    expect(res.status).toBe(200)
  })

  it(' test get users ', async () => {
    const res = await req.get('/api/users/index')

    expect(res.status).toBe(200)
  })

  it('test get specific user ', async () => {
    const res = await req.get('/api/users/show/1')

    expect(res.status).toBe(200)
  })

  it('test get all prodcuts ', async () => {
    const res = await req.get('/api/products/index')

    expect(res.status).toBe(200)
  })

  it(' test get specific product ', async () => {
    const res = await req.get('/api/products/show/1')

    expect(res.status).toBe(200)
  })

  it(' test get all orders ', async () => {
    const res = await req.get('/api/orders/index')

    expect(res.status).toBe(200)
  })

  it('==> test create user', async () => {
    const res = await req.post('/api/users/create').send({
      user_name: 'test',
      first_name: 'test',
      last_name: 'test',
      password: 'test'
    })

    expect(res.status).toBe(200)
  })

  afterAll(async () => {
    const connection = await client.connect()
    const sql = `DELETE FROM users where user_name = 'test';`
    const result = await connection.query(sql)
    connection.release()
  })

  it('==> test create product ', async () => {
    const res = await req.post('/api/products/create').send({
      name: 'Macbook',
      price: 1200,
      category: 'Laptop'
    })
    console.log(res)
    expect(res.status).toBe(200)
  })

  it('==> test create order ', async () => {
    const res = await req.post('/api/orders/create').send({
      user_id: 1,
      product_id: 1,
      status: 'active'
    })
    console.log(res)
    expect(res.status).toBe(200)
  })
})
