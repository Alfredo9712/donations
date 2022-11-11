import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import privateHandler from "../../../../src/middleware/authMiddlewareHandler";

const handler = privateHandler.post(
  (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("AUTH_TOKEN", "", {
        expires: new Date(0),
        path: "/",
      })
    );
    return res.status(200).json({ message: "Successfully logged out" });
  }
);

export default handler;
