import axios from "axios"
import Stripe from "stripe"

import config from "./config"

const stripe = new Stripe("dummy", {
  apiVersion: "2022-11-15",
})

const webhook = {
  send: async (event: any) => {
    if (config.webhook.url !== undefined) {
      const payload = JSON.stringify(event)

      const signature = stripe.webhooks.generateTestHeaderString({
        payload,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        secret: config.stripe.signingSecret!,
      })

      await axios({
        method: "post",
        url: config.webhook.url,
        data: payload,
        headers: {
          "Content-Type": "application/json",
          "Stripe-Signature": signature,
        },
      })
    }
  },

  checkoutSessionCompletedPayload: (clientReferenceId: any) => {
    return {
      id: "evt_1NBuXe2eZvKYlo2CiDEwxLvp",
      object: "event",
      api_version: "2019-02-19",
      created: 1685084066,
      data: {
        object: {
          id: "seti_1NBuXd2eZvKYlo2C8TQxqvM5",
          object: "setup_intent",
          application: null,
          automatic_payment_methods: null,
          cancellation_reason: null,
          client_secret: "seti_1NBuXd2eZvKYlo2C8TQxqvM5_secret_NxqE6FwuWqlvEmwhIinzwocWCvmVchK",
          client_reference_id: clientReferenceId,
          created: 1685084065,
          customer: "stripeHardcodedCustomerId",
          description: null,
          flow_directions: null,
          last_setup_error: null,
          latest_attempt: null,
          livemode: false,
          mandate: null,
          metadata: {},
          next_action: null,
          on_behalf_of: null,
          payment_method: "pm_1NBuXd2eZvKYlo2CoBD2t4rC",
          payment_method_options: {
            acss_debit: {
              currency: "cad",
              mandate_options: {
                interval_description: "First day of every month",
                payment_schedule: "interval",
                transaction_type: "personal",
              },
              verification_method: "automatic",
            },
          },
          payment_method_types: ["acss_debit"],
          single_use_mandate: null,
          status: "requires_confirmation",
          subscription: "stripeHardcodedSubscriptionId",
          usage: "off_session",
        },
      },
      livemode: false,
      pending_webhooks: 0,
      request: {
        id: null,
        idempotency_key: null,
      },
      type: "checkout.session.completed",
    }
  },
}

export default webhook
