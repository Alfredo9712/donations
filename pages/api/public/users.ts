import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import dbConnect from "../../../src/middleware/dbConnect";
import User from "../../../src/models/userModel";
const handler = nc()
  .use(async (req: NextApiRequest, res: NextApiResponse, next) => {
    await dbConnect();
    next();
  })
  // @desc      create a new user
  // @route     post /api/public/users
  // @access    Public
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    try {
      if (user) return res.status(200).json({ message: "user already exists" });

      const newUser = await User.create(req.body);

      return res.status(200).json(newUser);
    } catch (error) {
      return res.status(400).json(error);
    }
  });

export default handler;
