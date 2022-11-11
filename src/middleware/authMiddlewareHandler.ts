import { NextApiRequest, NextApiResponse } from "next";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import defaultHandler from "./defaultHandler";

interface JWTPayload {
  _id: string;
  email: string;
}

export interface ExtendedNextApiRequest extends NextApiRequest {
  id: string;
}
const authMiddlewareHandler = defaultHandler;

authMiddlewareHandler.use(
  async (req: ExtendedNextApiRequest, res: NextApiResponse, next) => {
    const token = req.cookies.AUTH_TOKEN;
    // if no token present return 401
    if (!token)
      return res.status(401).json({
        code: 100,
        message: "Not Authorized",
      });
    // if token is invalid return 401
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JWTPayload;

      const user = await User.findById({ _id: decoded._id });
      // check id in jwt payload is a user in database
      if (!user)
        return res.status(401).json({
          code: 100,
          message: "Not Authorized",
        });
      req.id = user._id;

      next(); // call to proceed to next in chain
    } catch (error) {
      return res.status(401).json({
        code: 100,
        message: "Not Authorized",
      });
    }
  }
);

export default authMiddlewareHandler;
