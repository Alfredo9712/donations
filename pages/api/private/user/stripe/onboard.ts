import { ExtendedNextApiRequest } from "../../../../../types/ExtendedNextApiRequest";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../../src/models/userModel";
import Stripe from "stripe";
import dbConnect from "../../../../../src/middleware/dbConnect";
import nc from "next-connect";
import authMiddleware from "../../../../../src/middleware/authMiddlewareHandler";
const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: "2022-11-15",
});

const handler = nc()
  .use(async (req: NextApiRequest, res: NextApiResponse, next) => {
    await dbConnect();
    next();
  })
  .use(async (req: ExtendedNextApiRequest, res: NextApiResponse, next) => {
    await authMiddleware(req, res);
    next();
  })
  // @desc      Retrieve link from stripe to send user to onboarding process
  // @route     POST /api/private/user/stripe/onboard
  // @access    Private
  .post(async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
    res.send("onboard");
    const user = await User.findById({ _id: req.id });
    try {
      const accountLink = await stripe.accountLinks.create({
        account: user.stripeAccountNumber,
        refresh_url: "http://localhost:3000/account-create",
        return_url: "http://localhost:3000/account-successful",
        type: "account_onboarding",
      });
      await user.save();
      return res.status(200).json(accountLink);
    } catch (error) {
      return res.status(400).json(error);
    }
  });

export default handler;
