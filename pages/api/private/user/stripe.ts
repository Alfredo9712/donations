import { ExtendedNextApiRequest } from "../../../../types/ExtendedNextApiRequest";
import { NextApiResponse } from "next";
import privateHandler from "../../../../src/middleware/authMiddlewareHandler";
import User from "../../../../src/models/userModel";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: "2022-11-15",
});

// const stripe = new Stripe('stripe', process.env.STRIPE_SECRET )

const handler = privateHandler
  // @desc      Return user requesting the API
  // @route     GET /api/private/user
  // @access    Private
  .get(async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
    const account = await stripe.accounts.create({ type: "express" });
    // return res.status(200).json(user);
  });

export default handler;
