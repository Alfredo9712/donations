import { ExtendedNextApiRequest } from "../../../../../types/ExtendedNextApiRequest";
import { NextApiRequest, NextApiResponse } from "next";
import privateHandler from "../../../../../src/middleware/authMiddlewareHandler";
import User from "../../../../../src/models/userModel";
import Stripe from "stripe";
import dbConnect from "../../../../../src/middleware/dbConnect";
const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: "2022-11-15",
});

const handler = privateHandler
  .use(async (req: NextApiRequest, res: NextApiResponse, next) => {
    await dbConnect();
    next();
  })
  // @desc      Create Stripe connected account and save stripe account number to user
  // @route     POST /api/private/user/stripe/account
  // @access    Private
  .post(async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
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
