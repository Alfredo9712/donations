import { NextApiRequest, NextApiResponse } from "next";
import privateHandler from "../../../../src/middleware/authMiddlewareHandler";

const handler = privateHandler.get(
  (req: NextApiRequest, res: NextApiResponse) => {
    res.send("hi");
  }
);

export default handler;
