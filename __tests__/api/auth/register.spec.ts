import handlerRegister from '@/../src/pages/api/auth/register'
import { MongoHelper } from '@/../src/db'
import { Collection } from 'mongodb'
import { createMocks } from 'node-mocks-http'

let userCollection: Collection

describe('Auth/Register', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL!)
    process.env.JWT_SECRET = 'secret_jwt'
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    userCollection = await MongoHelper.getCollection('users')
    await userCollection.deleteMany({})
  })

  test('should be return user data if valid data is provided', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'user_name',
        email: 'user_email@email.com',
        password: 'user_password'
      }
    })

    await handlerRegister(req, res)
    const responseData = JSON.parse(res._getData())
    expect(res._getStatusCode()).toBe(200)
    expect(responseData.user.email).toEqual('user_email@email.com')
  })

  test('should be return 403 if email is already', async () => {
    await userCollection.insertOne({
      name: 'user_name',
      email: 'user_email@email.com',
      password: 'hashed_password',
      accessToken: 'access_token'
    })

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'user_name',
        email: 'user_email@email.com',
        password: 'user_password'
      }
    })

    await handlerRegister(req, res)
    const responseData = JSON.parse(res._getData())
    expect(res._getStatusCode()).toBe(403)
    expect(responseData.message).toEqual('Email is already')
  })

  test('should be return 405 if method not allowed', async () => {
    const { req, res } = createMocks({
      method: 'GET'
    })

    await handlerRegister(req, res)
    const responseData = JSON.parse(res._getData())
    expect(res._getStatusCode()).toBe(405)
    expect(responseData.message).toContain('not Allowed')
    expect(res._headers.allow).toEqual(["POST"])
  })

  test('should be return 500 if MongoHelper connect throws', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'user_name',
        email: 'user_email@email.com',
        password: 'user_password'
      }
    })

    jest.spyOn(MongoHelper, 'connect').mockReturnValue(Promise.reject(new Error()))
    await handlerRegister(req, res)
    expect(res._getStatusCode()).toBe(500)
  })
})
