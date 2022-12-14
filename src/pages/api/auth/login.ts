import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { MongoHelper } from '@/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req

    switch (method) {
      case 'POST':
        const { email, password } = req.body

        await MongoHelper.connect(process.env.MONGO_URL!)

        const userCollection = await MongoHelper.getCollection('users')

        const user = await userCollection.findOne({ email: email })

        if (!user) {
          return res.status(403).json({ message: 'Invalid credentials' })
        }

        const comparePasswords = bcrypt.compareSync(password, user!.password)

        if (!comparePasswords) {
          return res.status(403).json({ message: 'Invalid credentials' })
        }

        const accessToken = await jwt.sign(
          { id: user.email },
          process.env.JWT_SECRET!
        )

        await userCollection.updateOne(
          {
            _id: user!._id,
          },
          {
            $set: {
              accessToken: accessToken,
            },
          }
        )

        const updatedUser = await userCollection.findOne({ email: email })

        delete updatedUser!.password

        res.status(200).json({ user: MongoHelper.map(updatedUser) })
        break
      default:
        res.setHeader('Allow', ['POST'])
        res.status(405).json({ message: `Method ${method} not Allowed` })
        break
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
