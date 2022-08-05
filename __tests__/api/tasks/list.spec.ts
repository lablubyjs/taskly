import handlerList from '@/../src/pages/api/tasks/list'
import { MongoHelper } from '@/../src/db'
import { Collection } from 'mongodb'
import { createMocks } from 'node-mocks-http'

let userCollection: Collection
let taskCollection: Collection

describe('Tasks/List', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL!)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    userCollection = await MongoHelper.getCollection('users')
    await userCollection.deleteMany({})
    taskCollection = await MongoHelper.getCollection('tasks')
    await taskCollection.deleteMany({})
  })

  test('should be return tasks data if valid accessToken is provided', async () => {
    const insertRes = await userCollection.insertOne({
      name: 'user_name',
      email: 'user_email@email.com',
      password: 'user_password',
      accessToken: 'access_token'
    })
    
    await taskCollection.insertOne({
      userId: insertRes.insertedId,
      title: "task_title",
      description: "task_description",
      time: "11:00-12:00",
      icon: "task_icon",
      tag: "task_tag",
      date: new Date(),
      isDone: false
    })

    const { req, res } = createMocks({
      method: 'GET',
      headers: {
        authorization: `Bearer access_token`
      }
    })

    await handlerList(req, res)
    const responseData = JSON.parse(res._getData())
    expect(res._getStatusCode()).toBe(200)
    expect(responseData.tasks).toHaveLength(1)
  })

  test('should be return 401 if no accessToken is provided', async () => {
    await userCollection.insertOne({
      name: 'user_name',
      email: 'user_email@email.com',
      password: 'user_password',
      accessToken: 'access_token'
    })

    const { req, res } = createMocks({
      method: 'GET'
    })

    await handlerList(req, res)
    const responseData = JSON.parse(res._getData())
    expect(res._getStatusCode()).toBe(401)
    expect(responseData.message).toEqual('No Bearer Token is provided')
  })

  test('should be return 403 if invalid accessToken is provided', async () => {
    await userCollection.insertOne({
      name: 'user_name',
      email: 'user_email@email.com',
      password: 'user_password',
      accessToken: 'access_token'
    })

    const { req, res } = createMocks({
      method: 'GET',
      headers: {
        authorization: `Bearer invalid_access_token`
      }
    })

    await handlerList(req, res)
    const responseData = JSON.parse(res._getData())
    expect(res._getStatusCode()).toBe(403)
    expect(responseData.message).toEqual('Invalid AccessToken')
  })

  test('should be return 405 if method not allowed', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      headers: {
        authorization: undefined
      }
    })

    await handlerList(req, res)
    const responseData = JSON.parse(res._getData())
    expect(res._getStatusCode()).toBe(405)
    expect(responseData.message).toContain('not Allowed')
    expect(res._headers.allow).toEqual(["GET"])
  })

  test('should be return 500 if MongoHelper connect throws', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      headers: {
        authorization: 'Bearer access_token'
      }
    })

    jest.spyOn(MongoHelper, 'connect').mockReturnValue(Promise.reject(new Error()))
    await handlerList(req, res)
    expect(res._getStatusCode()).toBe(500)
  })
})
