# Proxy for Stripe Mock server for e2e tests

A proxy for [Stripe Mock server](https://github.com/stripe/stripe-mock) that overrides endpoints in order to be able
to run e2e tests against it.

Stripe is maintaining a mock server that returns always hardcoded responses. This is not good for e2e testing, since
for example starting a checkout session should not redirect to an hardcoded URL on the Stripe website, rather invoke
our web hook and redirect to success URL. To fix that without implementing a mock server from scratch we developed
this proxy that overrides the endpoints for the responses we need to change and forwards everything else to the mock
Stripe server.
