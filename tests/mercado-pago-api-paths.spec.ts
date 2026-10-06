/**
 * Regression: the host api client already carries baseURL `/api/v1`, so the
 * view must pass paths relative to it. A `/api/v1/...` literal produced
 * `/api/v1/api/v1/...` -> 404 in production.
 *
 * The fake sits at the transport (axios adapter) so the asserted path is the
 * one that would actually hit the wire.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { api } from '@/api';
import MercadoPagoPaymentView from '../MercadoPagoPaymentView.vue';

const { routeQuery } = vi.hoisted(() => ({
  routeQuery: { invoice: 'INV-1', amount: '100.00', country: 'BR', currency: 'BRL' },
}));
vi.mock('vue-router', () => ({
  useRoute: () => ({ query: routeQuery }),
}));

// The production baseURL (vue/src/api/index.ts fallback); pinned so a local
// VITE_API_URL override cannot mask a doubled prefix.
const PRODUCTION_BASE_URL = '/api/v1';
const requestedPaths: string[] = [];

function installFakeTransport(responseFor: (path: string) => unknown): void {
  const transport = (api as unknown as { axiosInstance: AxiosInstance }).axiosInstance;
  transport.defaults.baseURL = PRODUCTION_BASE_URL;
  transport.defaults.adapter = async (config: InternalAxiosRequestConfig) => {
    const path = `${config.baseURL ?? ''}${config.url ?? ''}`;
    requestedPaths.push(path);
    return { data: responseFor(path), status: 200, statusText: 'OK', headers: {}, config };
  };
}

const INIT_POINT = 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=pref-1';
const originalLocation = window.location;

describe('MercadoPagoPaymentView api paths', () => {
  beforeEach(() => {
    requestedPaths.length = 0;
    installFakeTransport(() => ({ init_point: INIT_POINT }));
    Object.defineProperty(window, 'location', {
      configurable: true,
      writable: true,
      value: { origin: 'http://localhost', href: '' },
    });
  });
  afterEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      writable: true,
      value: originalLocation,
    });
  });

  it('creates the preference on the single-prefixed backend route and redirects', async () => {
    mount(MercadoPagoPaymentView, { global: { mocks: { $t: (key: string) => key } } });
    await flushPromises();

    expect(requestedPaths).toEqual(['/api/v1/plugins/mercado-pago/preferences']);
    expect(window.location.href).toBe(INIT_POINT);
  });
});
