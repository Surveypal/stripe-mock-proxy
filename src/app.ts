import express from "express"
import type { Express } from "express"
import morgan from "morgan"

import webhook from "./webhook"

const app: Express = express()

app.use(morgan("combined"))
app.use(express.urlencoded({ extended: true }))

app.get("/ping", (req, res) => {
  res.type("json")
  res.status(200)
  res.send("pong")
})

app.post("/v1/checkout/sessions", async (req, res) => {
  const body = req.body

  console.log("Request headers", req.headers)

  try {
    await webhook.send(webhook.checkoutSessionCompletedPayload(body.client_reference_id))
  } catch (e) {
    res.type("json")
    res.status(500)
    res.send({
      message: "Error calling webhook",
      error: e,
    })
    return
  }

  const response = {
    after_expiration: null,
    allow_promotion_codes: null,
    amount_subtotal: null,
    amount_total: null,
    automatic_tax: {
      enabled: false,
      status: null,
    },
    billing_address_collection: null,
    cancel_url: body.cancel_url,
    client_reference_id: body.client_reference_id,
    consent: null,
    consent_collection: null,
    created: 1234567890,
    currency: null,
    currency_conversion: null,
    custom_fields: [],
    custom_text: {
      shipping_address: null,
      submit: null,
    },
    customer: Date.now().toString(),
    customer_creation: null,
    customer_details: {
      address: null,
      email: body.customer_email,
      name: null,
      phone: null,
      tax_exempt: "none",
      tax_ids: null,
    },
    customer_email: null,
    expires_at: 1234567890,
    id: "cs_test_a1uN2on2cJT5tl4tUIGr8PIGejKQ2zA7V5ensSfYqdrfoL0Xhttp3P5lE6",
    invoice: null,
    invoice_creation: null,
    livemode: false,
    locale: null,
    metadata: {},
    mode: "payment",
    object: "checkout.session",
    payment_intent: "pi_1Mxz5qArWMVfByDX3OnGAH6C",
    payment_link: null,
    payment_method_collection: null,
    payment_method_options: {},
    payment_method_types: ["card"],
    payment_status: "unpaid",
    phone_number_collection: {
      enabled: false,
    },
    recovered_from: null,
    setup_intent: null,
    shipping_address_collection: null,
    shipping_cost: null,
    shipping_details: null,
    shipping_options: [],
    status: "open",
    submit_type: null,
    subscription: null,
    success_url: body.success_url,
    total_details: null,
    url: body.success_url,
  }

  res.status(200)
  res.send(response)
})

app.get("/v1/subscriptions/stripeHardcodedSubscriptionId", (req, res) => {
  const response = {
    application: null,
    application_fee_percent: null,
    automatic_tax: {
      enabled: false,
    },
    billing_cycle_anchor: 1234567890,
    billing_thresholds: null,
    cancel_at: 1234567890,
    cancel_at_period_end: false,
    canceled_at: 1234567890,
    cancellation_details: {
      comment: null,
      feedback: null,
      reason: null,
    },
    collection_method: "charge_automatically",
    created: 1234567890,
    currency: "usd",
    current_period_end: 1234567890,
    current_period_start: 1234567890,
    customer: "cus_Nj5B57LZqvnaIg",
    days_until_due: null,
    default_payment_method: null,
    default_source: null,
    default_tax_rates: [],
    description: null,
    discount: null,
    ended_at: 1234567890,
    id: "stripeHardcodedSubscriptionId",
    items: {
      data: [
        {
          billing_thresholds: null,
          created: 1682347603,
          id: "si_NlycwoOKao8VBA",
          metadata: {},
          object: "subscription_item",
          price: {
            active: true,
            billing_scheme: "per_unit",
            created: 1681680097,
            currency: "usd",
            custom_unit_amount: null,
            id: "price_1Mxd0vLKkAKty0Q8JV1qLL0v",
            livemode: false,
            lookup_key: null,
            metadata: {},
            nickname: null,
            object: "price",
            product: "prod_Nj5BBP2W3A6rX2",
            recurring: {
              aggregate_usage: null,
              interval: "month",
              interval_count: 1,
              usage_type: "licensed",
            },
            tax_behavior: "unspecified",
            tiers_mode: null,
            transform_quantity: null,
            type: "recurring",
            unit_amount: 2000,
            unit_amount_decimal: "2000",
          },
          quantity: 1,
          subscription: "sub_1N0Qf8LKkAKty0Q8gE0qfyna",
          tax_rates: [],
        },
      ],
      has_more: false,
      object: "list",
      url: "/v1/subscription_items?subscription=sub_1N0Qf5LKkAKty0Q8ocjnVxrK",
    },
    latest_invoice: null,
    livemode: false,
    metadata: {},
    next_pending_invoice_item_invoice: 1234567890,
    object: "subscription",
    on_behalf_of: null,
    pause_collection: null,
    payment_settings: {
      payment_method_options: null,
      payment_method_types: null,
      save_default_payment_method: null,
    },
    pending_invoice_item_interval: null,
    pending_setup_intent: null,
    pending_update: null,
    plan: {
      product: "prod_Nj5BBP2W3A6rX2",
    },
    schedule: null,
    start_date: 1234567890,
    status: "active",
    test_clock: null,
    transfer_data: null,
    trial_end: 1234567890,
    trial_settings: {
      end_behavior: {
        missing_payment_method: "create_invoice",
      },
    },
    trial_start: 1234567890,
  }

  res.type("json")
  res.status(200)
  res.send(response)
})

export default app
