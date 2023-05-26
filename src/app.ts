import express from "express"
import type { Express, Request } from "express"
import morgan from "morgan"

import config from "./config"

const app: Express = express()

app.use(morgan("combined"))
app.use(express.urlencoded({ extended: true }))

app.get("/ping", (req, res) => {
  res.type("json")
  res.status(200)
  res.send("pong")
})

app.post("/v1/checkout/sessions", (req, res) => {
  const body = req.body

  console.log("Request", req)
  console.log("Request body", body)

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
    client_reference_id: null,
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
    customer: null,
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

  console.log("Response", response)

  res.status(200)
  res.send(response)
})

export default app
