<template>
  <div class="mp-payment">
    <div v-if="loading" class="mp-payment__loading">
      <p>{{ $t('mercadoPago.payment.creating') }}</p>
    </div>
    <div v-else-if="error" class="mp-payment__error">
      <p>{{ error }}</p>
      <button class="btn btn-primary" @click="createPreference">
        {{ $t('mercadoPago.payment.retry') }}
      </button>
    </div>
    <div v-else-if="initPoint" class="mp-payment__redirect">
      <p>{{ $t('mercadoPago.payment.redirecting') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { api } from '@/api';

const route = useRoute();
const loading = ref(false);
const error = ref<string | null>(null);
const initPoint = ref<string | null>(null);

async function createPreference() {
  const invoiceNo = (route.query.invoice as string) || '';
  const country = (route.query.country as string) || 'BR';
  const amount = route.query.amount;
  const currency = (route.query.currency as string) || 'BRL';
  if (!invoiceNo) {
    error.value = 'No invoice specified';
    return;
  }
  loading.value = true;
  error.value = null;
  try {
    const resp = await api.post('/api/v1/plugins/mercado-pago/preferences', {
      invoice_no: invoiceNo,
      country,
      amount,
      currency,
      method: route.query.method,
      installments: route.query.installments
        ? Number(route.query.installments)
        : undefined,
      return_url: `${window.location.origin}/pay/mercado-pago/success`,
      cancel_url: `${window.location.origin}/pay/mercado-pago/cancel`,
    });
    const body = await resp.json();
    initPoint.value = body.init_point || body.sandbox_init_point;
    if (initPoint.value) {
      window.location.href = initPoint.value;
    } else {
      error.value = 'No init_point in response';
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'failed';
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  createPreference();
});
</script>

<style scoped>
.mp-payment {
  max-width: 480px;
  margin: 4rem auto;
  padding: 1.5rem;
  text-align: center;
}
.mp-payment__error {
  color: var(--vbwd-color-danger, #b22);
}
</style>
