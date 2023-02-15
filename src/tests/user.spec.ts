import client from '../index.database'
import config from '../config'
import UserModel from '../models/user.model'
import User from '../types/user.types'

const userModel = new UserModel()

describe('UserModel Test .', () => {
  describe('Test Exsist', () => {
    it('Should  create ', () => {
      expect(userModel.create).toBeDefined()
    })

    it('Should auth  .', () => {
      expect(userModel.authenticate).toBeDefined()
    })

    it('Should  show .', () => {
      expect(userModel.show).toBeDefined()
    })

    it('Should be an index method .', () => {
      expect(userModel.index).toBeDefined()
    })
  })

  describe('test Auth logic', () => {
    const user = {
      user_name: 'samehelhelw',
      first_name: 'sameh',
      last_name: 'elhelw',
      password: 'test'
    } as unknown as User

    beforeAll(async () => {
      const createdUser = await userModel.create(user)
      user.id = createdUser.id
    })

    it('user show should return ', async () => {
      const result = await userModel.show(1)
      expect(result).toEqual(result)
    })

    it('user index should return ', async () => {
      const result = await userModel.index()
      expect(result.length).toBeGreaterThan(0)
    })

    afterAll(async () => {
      const connection = await client.connect()
      const sql = `DELETE FROM users where user_name = '${user.user_name}';`
      const result = await connection.query(sql)
      connection.release()
    })
  })
})
