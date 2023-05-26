export default {
  webhook: {
    url: process.env.WEBHOOK_URL,
  },
  stripe: {
    signingSecret: process.env.STRIPE_SIGNING_SECRET,
  },
}
