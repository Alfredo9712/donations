import { ExtendedNextApiRequest } from "../../../../../types/ExtendedNextApiRequest";
import { NextApiResponse } from "next";
import privateHandler from "../../../../../src/middleware/authMiddlewareHandler";
import User from "../../../../../src/models/userModel";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: "2022-11-15",
});

const handler = privateHandler
  // @desc      Retrieve link from stripe to send user to onboarding process
  // @route     POST /api/private/user/stripe/onboard
  // @access    Private
  .post(async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
    const user = await User.findById({ _id: req.id });
    try {
      const accountLink = await stripe.accountLinks.create({
        account: user.stripeAccountNumber,
        refresh_url: "https://example.com/reauth",
        return_url: "https://example.com/return",
        type: "account_onboarding",
      });
      await user.save();
      return res.status(200).json(accountLink);
    } catch (error) {
      return res.status(400).json(error);
    }
  });

export default handler;
