import { NextApiRequest, NextApiResponse } from "next";
import User from "../models/userModel";

import jwt from "jsonwebtoken";
import defaultHandler from "./defaultHandler";
const privateHandler = defaultHandler;

interface JWTPayload {
  _id: string;
  email: string;
}

export interface ExtendedNextApiRequest extends NextApiRequest {
  id: string;
}

privateHandler.use(
  async (req: ExtendedNextApiRequest, res: NextApiResponse, next) => {
    const token = req.cookies.AUTH_TOKEN;

    if (!token)
      return res.status(401).json({
        code: 100,
        message: "Not Authorized",
      });

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JWTPayload;

      const user = await User.findById({ _id: decoded._id });

      if (!user)
        return res.status(401).json({
          code: 100,
          message: "Not Authorized",
        });
      req.id = user._id;
      console.log(user);
      next(); // call to proceed to next in chain
    } catch (error) {
      return res.status(401).json({
        code: 100,
        message: "Not Authorized",
      });
    }
  }
);

export default privateHandler;
