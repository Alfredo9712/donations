import { NextApiRequest, NextApiResponse } from "next";
import privateHandler, {
  ExtendedNextApiRequest,
} from "../../../../src/middleware/authMiddlewareHandler";
import User from "../../../../src/models/userModel";
const handler = privateHandler.get(
  async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
    const user = await User.findById({ _id: req.id });
    return res.status(200).json(user);
  }
);

export default handler;
