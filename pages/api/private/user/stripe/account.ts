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
  // @desc      Create Stripe connected account and save stripe account number to user
  // @route     POST /api/private/user/stripe/account
  // @access    Private
  .post(async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
    res.send("account");
    const { country } = req.body;
    const user = await User.findById({ _id: req.id });
    // create stripe connect account
    try {
      const account = await stripe.accounts.create({
        type: "custom",
        country,
        email: user.email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
      });
      // save stripe account number to user
      user.stripeAccountNumber = account.id;
      await user.save();
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json(error);
    }
  });

export default handler;
