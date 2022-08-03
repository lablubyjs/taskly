import { MongoHelper } from '@/db'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req

    switch (method) {
      case 'GET':
        const { authorization } = req.headers

        await MongoHelper.connect(process.env.MONGODB_URI!)
        
        const userCollection = await MongoHelper.getCollection('users')
        
        const [_, token] = authorization!.split('Bearer ')
        
        if (!token) {
          return res.status(401).json({ message: 'No Bearer Token is provided'})
        }

        const user = await userCollection.findOne({ accessToken: token })

        console.log(user, token)

        if (!user) {
          return res.status(403).json({ message: 'Invalid AccessToken'})
        }

        res.status(200).json({ user: MongoHelper.map(user) })
        break;
      default:
        res.setHeader('Allow', ['GET'])
        res.status(405).json({ message: `Method ${method} not Allowed` })
        break;
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
