# Mercado Pago Payment Plugin (fe-user)

Vue 3 plugin wiring Mercado Pago LATAM checkout into the user
storefront. Creates a preference via the backend, redirects the
browser to Mercado Pago's hosted page.

## Routes

| Path | Component |
|------|-----------|
| `/pay/mercado-pago` | `MercadoPagoPaymentView.vue` |
| `/pay/mercado-pago/success` | `MercadoPagoSuccessView.vue` |
| `/pay/mercado-pago/cancel` | `MercadoPagoCancelView.vue` |

## i18n

`en`, `pt` (Brazilian Portuguese), `es` (pan-LATAM Spanish).

## Backend

Pairs with [`vbwd-plugin-mercado-pago`](https://github.com/VBWD-platform/vbwd-plugin-mercado-pago).

---

**Core:** [vbwd-fe-user](https://github.com/VBWD-platform/vbwd-fe-user)
