import { ExtendedNextApiRequest } from "../../../../types/ExtendedNextApiRequest";
import { NextApiResponse } from "next";
import privateHandler from "../../../../src/middleware/authMiddlewareHandler";
import User from "../../../../src/models/userModel";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: "2022-11-15",
});

const handler = privateHandler
  // @desc      Create Stripe connected account
  // @route     POST /api/private/user/stripe
  // @access    Private
  .post(async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
    const { country } = req.body;
    const user = await User.findById({ _id: req.id });
    const account = await stripe.accounts.create({
      type: "custom",
      country,
      email: user.email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });

    return res.status(200).json(account);
  });

export default handler;
//
