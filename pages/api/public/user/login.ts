import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../src/models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import defaultHandler from "../../../../src/middleware/defaultHandler";

const handler = defaultHandler.post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    try {
      if (!user)
        return res.status(400).json({ message: "Invalid Credentials" });
    } catch (error) {
      res.status(400).json(error);
    }
  }
);
// @desc      Login User
// @route     POST /api/public/user/login
// @access    Public

export default handler;
