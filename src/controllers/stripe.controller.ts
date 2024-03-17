import type { Request, Response } from "express";
import { config } from "../config";
import {
  handleProcessWebhookCheckout,
  handleProcessWebhookUpdatedSubscription,
  stripe,
} from "../lib/stripe";

import Stripe from "stripe";

export const stripeWebhookController = async (
  request: Request,
  response: Response,
) => {
  let event = request.body;

  if (!config.stripe.webhookSecret) {
    console.error("Secret key is not set.");

    return response.sendStatus(400);
  }

  const signature = request.headers["stripe-signature"] as string;

  try {
    event = await stripe.webhooks.constructEventAsync(
      request.body,
      signature,
      config.stripe.webhookSecret,
      undefined,
      Stripe.createSubtleCryptoProvider(),
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("⚠ Webhook signature verification failed.", errorMessage);
    return response.sendStatus(400);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        handleProcessWebhookCheckout(event);
        break;

      case "customer.subscription.created":
      case "customer.subscription.updated":
        handleProcessWebhookUpdatedSubscription(event);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return response.json({ received: true });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("⚠ Webhook signature verification failed.", errorMessage);
    return response.status(500).json({ error: errorMessage });
  }
};
