import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import dbConnect from "../../../src/middleware/dbConnect";

const handler = nc()
  .use(async (req: NextApiRequest, res: NextApiResponse, next) => {
    await dbConnect();
    next();
  })
  .get((req: NextApiRequest, res: NextApiResponse) => {
    res.send("hi");
  });

export default handler;
