import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../src/models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import defaultHandler from "../../../../src/middleware/defaultHandler";

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const handler = defaultHandler
  // @desc      Register a new user
  // @route     POST /api/public/user/register
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
          email,
          _id: newUser._id,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 }
      );

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("AUTH_TOKEN", token, {
          httpOnly: true,
          maxAge: 8 * 60 * 60,
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        })
      );

      return res.status(200).json({ newUser });
    } catch (error) {
      return res.status(400).json(error);
    }
  });

export default handler;
