import { MongoHelper } from '@/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req

    switch (method) {
      case 'POST':
        const { name, email, password } = req.body

        await MongoHelper.connect(process.env.MONGO_URL!)

        const userCollection = await MongoHelper.getCollection('users')

        const existsUser = await userCollection.findOne({ email: email })

        if (existsUser) {
          return res.status(403).json({ message: 'Email is already'})
        }
        
        const hashedPassword = bcrypt.hashSync(password, 12)
        
        const accessToken = await jwt.sign({id: email }, process.env.JWT_SECRET!)

        const result = await userCollection.insertOne({
          name,
          email,
          password: hashedPassword,
          accessToken
        })

        const user = await userCollection.findOne({ _id: result.insertedId })

        delete user!.password

        res.status(200).json({ user: MongoHelper.map(user) })
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
