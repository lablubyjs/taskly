import { MongoHelper } from '@/db'
import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req

    switch (method) {
      case 'PUT':
        const { authorization } = req.headers
        const { name, email } = req.body

        if (!authorization) {
          return res.status(401).json({ message: 'No Bearer Token is provided'})
        }

        await MongoHelper.connect(process.env.MONGO_URL!)
        
        const userCollection = await MongoHelper.getCollection('users')
        
        const [_, token] = authorization!.split('Bearer ')

        await jwt.verify(token, process.env.JWT_SECRET!)
        
        await userCollection.updateOne({
          accessToken: token,
        }, {
          $set: {
            name,
            email
          }
        })

        const user = await userCollection.findOne({ accessToken: token })

        if (!user) {
          return res.status(403).json({ message: 'Invalid AccessToken'})
        }

        res.status(200).json({ user: MongoHelper.map(user) })
        break;
      default:
        res.setHeader('Allow', ['PUT'])
        res.status(405).json({ message: `Method ${method} not Allowed` })
        break;
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
