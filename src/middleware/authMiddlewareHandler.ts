import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const privateHandler = nc();

privateHandler.use((req: NextApiRequest, res: NextApiResponse, next) => {
  const token = req.cookies.AUTH_TOKEN;
  if (!token)
    return res.status(400).json({
      code: 100,
      message: "Not Authorized",
    });
  next(); // call to proceed to next in chain
});

export default privateHandler;
