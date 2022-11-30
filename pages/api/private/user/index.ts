import { ExtendedNextApiRequest } from "../../../../types/ExtendedNextApiRequest";
import { NextApiRequest, NextApiResponse } from "next";
import privateHandler from "../../../../src/middleware/authMiddlewareHandler";
import User from "../../../../src/models/userModel";
import dbConnect from "../../../../src/middleware/dbConnect";
const handler = privateHandler
  .use(async (req: NextApiRequest, res: NextApiResponse, next) => {
    await dbConnect();
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
