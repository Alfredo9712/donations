import { ExtendedNextApiRequest } from "../../../../types/ExtendedNextApiRequest";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../src/models/userModel";
import dbConnect from "../../../../src/middleware/dbConnect";
import nc from "next-connect";
import authMiddleware from "../../../../src/middleware/authMiddlewareHandler";
const handler = nc()
  .use(async (req: NextApiRequest, res: NextApiResponse, next) => {
    await dbConnect();
    next();
  })
  .use(async (req: ExtendedNextApiRequest, res: NextApiResponse, next) => {
    await authMiddleware(req, res);
    next();
  })
  // @desc      Return user requesting the API
  // @route     GET /api/private/user
  // @access    Private
  .get(async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
    const user = await User.findById({ _id: req.id });
    return res.status(200).json(user);
  });

export default handler;
