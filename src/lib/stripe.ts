import Stripe from "stripe";
import { config } from "../config";

export const stripe = new Stripe(config.stripe.privateKey as string, {
  apiVersion: "2023-10-16",
});

export const createCheckoutSession = async (userId: string) => {
  try {
    const session = stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      client_reference_id: userId,
      success_url: config.stripe.success_url,
      cancel_url: config.stripe.cancel_url,
      line_items: [
        {
          price: config.stripe.proPriceId,
          quantity: 1,
        },
      ],
    });

    return {
      url: (await session).url,
    };
  } catch (error) {
    console.error(error);
  }
};

export const handleProdessWebhookCheckout = () => {};

export const handleProdessWebhookUpdatedSubscription = () => {};
