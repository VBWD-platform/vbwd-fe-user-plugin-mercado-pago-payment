import type { IPlugin, IPlatformSDK } from 'vbwd-view-component';
import en from './locales/en.json';
import pt from './locales/pt.json';
import es from './locales/es.json';

export const mercadoPagoPaymentPlugin: IPlugin = {
  name: 'mercado-pago-payment',
  version: '1.0.0',
  description:
    'Mercado Pago LATAM — Pix, Boleto, OXXO, SPEI, PSE, Webpay, cards + installments',
  _active: false,

  install(sdk: IPlatformSDK) {
    sdk.addRoute({
      path: '/pay/mercado-pago',
      name: 'mercado-pago-payment',
      component: () => import('./MercadoPagoPaymentView.vue'),
      meta: { requiresAuth: true, noLayout: true },
    });
    sdk.addRoute({
      path: '/pay/mercado-pago/success',
      name: 'mercado-pago-success',
      component: () => import('./MercadoPagoSuccessView.vue'),
      meta: { requiresAuth: true, noLayout: true },
    });
    sdk.addRoute({
      path: '/pay/mercado-pago/cancel',
      name: 'mercado-pago-cancel',
      component: () => import('./MercadoPagoCancelView.vue'),
      meta: { requiresAuth: true, noLayout: true },
    });

    sdk.addTranslations('en', en);
    sdk.addTranslations('pt', pt);
    sdk.addTranslations('es', es);
  },

  activate() {
    this._active = true;
  },
  deactivate() {
    this._active = false;
  },
};
