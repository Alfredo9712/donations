import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../src/models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import nc from "next-connect";
import dbConnect from "../../../../src/middleware/dbConnect";

const handler = nc()
  .use(async (req: NextApiRequest, res: NextApiResponse, next) => {
    await dbConnect();
    next();
  })
  // @desc      Login User
  // @route     POST /api/public/user/login
  // @access    Public
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    try {
      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const token = jwt.sign(
        {
          email,
          _id: user._id,
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

      return res.status(200).json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  });

export default handler;
