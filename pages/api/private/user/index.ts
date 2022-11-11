import { ExtendedNextApiRequest } from "../../../../types/ExtendedNextApiRequest";
import { NextApiResponse } from "next";
import privateHandler from "../../../../src/middleware/authMiddlewareHandler";
import User from "../../../../src/models/userModel";
const handler = privateHandler
  // @desc      Return user requesting the API
  // @route     GET /api/public/user
  // @access    Private
  .get(async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
    const user = await User.findById({ _id: req.id });
    return res.status(200).json(user);
  });

export default handler;
