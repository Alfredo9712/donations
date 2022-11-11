import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import privateHandler from "../../../../src/middleware/authMiddlewareHandler";

const handler = privateHandler
  // @desc      Set cookie to an expired date and logout user
  // @route     POST /api/private/user/logout
  // @access    Private
  .post((req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("AUTH_TOKEN", "", {
        expires: new Date(0),
        path: "/",
      })
    );
    return res.status(200).json({ message: "Successfully logged out" });
  });

export default handler;
