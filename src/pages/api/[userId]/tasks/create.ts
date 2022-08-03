import { MongoHelper } from '@/db'
import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req

    switch (method) {
      case 'POST':
        const { authorization } = req.headers
        const { userId } = req.query
        const data = req.body

        console.log(typeof userId)

        await MongoHelper.connect(process.env.MONGODB_URI!)
        
        const userCollection = await MongoHelper.getCollection('users')
        const taskCollection = await MongoHelper.getCollection('tasks')
        
        const [_, token] = authorization!.split('Bearer ')
        
        if (!token) {
          return res.status(401).json({ message: 'No Bearer Token is provided'})
        }

        const user = await userCollection.findOne({ _id: new ObjectId(userId?.toString()) })

        console.log(user, token)

        if (!user) {
          return res.status(403).json({ message: 'Invalid AccessToken'})
        }

        const result = await taskCollection.insertOne({
          userId: new ObjectId(userId?.toString()),
          ...data
        })

        const task = await taskCollection.findOne({ _id: result.insertedId })

        res.status(200).json({ user: MongoHelper.map(task) })
        break;
      default:
        res.setHeader('Allow', ['POST'])
        res.status(405).json({ message: `Method ${method} not Allowed` })
        break;
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
