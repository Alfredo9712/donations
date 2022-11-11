import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import dbConnect from "./dbConnect";

const defaultHandler = nc();

defaultHandler.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
  await dbConnect();
  next();
});

export default defaultHandler;
