export const config = {
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    privateKey: process.env.STRIPE_PRIVATE_KEY,
    proPriceId: process.env.STRIPE_PRO_PRICE,
    success_url: process.env.STRIPE_SUCCESS_URL,
    cancel_url: process.env.STRIPE_CANCEL_URL,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },
};
