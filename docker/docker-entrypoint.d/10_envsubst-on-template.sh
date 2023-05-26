#!/bin/bash

set -e

echo "Generating nginx config file from template and environment"

envsubst '$STRIPE_MOCK_URL' </etc/nginx/sites-available/stripe-mock >/etc/nginx/sites-enabled/stripe-mock
