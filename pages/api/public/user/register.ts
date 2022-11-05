import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import dbConnect from "../../../../src/middleware/dbConnect";
import User from "../../../../src/models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const handler = nc()
  .use(async (req: NextApiRequest, res: NextApiResponse, next) => {
    await dbConnect();
    next();
  })
  // @desc      Register a new user
  // @route     Post /api/public/user/register
  // @access    Public
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    try {
      if (user) return res.status(200).json({ message: "user already exists" });

      const hashedPassword = bcrypt.hashSync(password, salt);

      const newUser = await User.create({
        email,
        name,
        password: hashedPassword,
      });

      const token = await jwt.sign(
        {
          data: { email, _id: newUser._id },
        },
        process.env.JWT_SECRET as string,
        { expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 }
      );

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(400).json(error);
    }
  });

export default handler;
