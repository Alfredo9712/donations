import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import privateHandler from "../../../../src/middleware/authMiddleware";

privateHandler.get((req: NextApiRequest, res: NextApiResponse) => {
  res.send("hi");
});

export default privateHandler;
