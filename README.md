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

## Documentation

Full platform documentation lives at **[vbwd.cc/docs](https://vbwd.cc/docs)**.

- [Frontend plugins](https://vbwd.cc/docs-frontend-plugins) — how fe-admin / fe-user plugins are built and mounted
- [Payments](https://vbwd.cc/docs-core-payments) — documentation for this plugin's domain
- [Architecture](https://vbwd.cc/docs-architecture) — platform layering and the core-agnosticism rule
- [Getting started](https://vbwd.cc/docs-getting-started) — install a VBWD instance and enable plugins
