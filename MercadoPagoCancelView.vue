<template>
  <div class="mp-cancel">
    <h2>{{ $t('mercadoPago.cancel.title') }}</h2>
    <p>{{ $t('mercadoPago.cancel.message') }}</p>
    <router-link class="btn btn-secondary" to="/checkout">
      {{ $t('mercadoPago.cancel.retry') }}
    </router-link>
  </div>
</template>

<style scoped>
.mp-cancel { max-width: 480px; margin: 4rem auto; text-align: center; }
</style>
