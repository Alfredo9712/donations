import nc from "next-connect";

import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
const handler = nc().post((req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    "Cookie",
    cookie.serialize("AUTH_TOKEN", "", {
      httpOnly: true,
      maxAge: Date.now(),
    })
  );
});

export default handler;
