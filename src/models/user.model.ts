import client from '../index.database'
import User from '../types/user.types'
import bcrypt from 'bcrypt'
import config from '../config'

const hashPassword = (password: string) => {
  const salt = parseInt(config.salt as string, 10)
  return bcrypt.hashSync(`${password}${config.pepper}`, salt)
}

export class Usermodel {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM users;'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Couldn't get users because of ${error}`)
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT id,first_name,last_name,user_name FROM users WHERE id =($1)'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldn't get user with this id : ${id}=> ${(error as Error).message}`)
    }
  }

  async create(user: User): Promise<User> {
    try {
      const conn = await client.connect()
      const sql =
        'INSERT INTO users (first_name,last_name,user_name,password) VALUES($1,$2,$3,$4) RETURNING *'

      const result = await conn.query(sql, [
        user.first_name,
        user.last_name,
        user.user_name,
        hashPassword(user.password as string)
      ])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldn't add new user => ${error}`)
    }
  }

  async update(u: User): Promise<User> {
    try {
      const connection = await client.connect()
      const sql = `UPDATE users 
                  SET  user_name=$1, first_name=$2, last_name=$3, password=$4 
                  WHERE id=$5
                  RETURNING id, user_name, first_name, last_name`

      const result = await connection.query(sql, [
        u.user_name,
        u.first_name,
        u.last_name,
        hashPassword(u.password as string),
        u.id
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not update user: ${u.user_name}, ${error}`)
    }
  }

  async authenticate(user_name: string, password: string): Promise<User | null> {
    try {
      const connection = await client.connect()
      const sql = 'SELECT password FROM users WHERE user_name=$1'
      const result = await connection.query(sql, [user_name])
      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0]
        const isPasswordValid = bcrypt.compareSync(`${password}${config.pepper}`, hashPassword)
        if (isPasswordValid) {
          const userInfo = await connection.query(
            'SELECT id, user_name, first_name, last_name FROM users WHERE user_name=($1)',
            [user_name]
          )
          return userInfo.rows[0]
        }
      }
      connection.release()
      return null
    } catch (error) {
      throw new Error(`Unable to login: ${error}`)
    }
  }
}

export default Usermodel
