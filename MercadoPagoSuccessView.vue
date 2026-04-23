<template>
  <div class="mp-success">
    <h2>{{ $t('mercadoPago.success.title') }}</h2>
    <p>{{ $t('mercadoPago.success.message') }}</p>
    <router-link class="btn btn-primary" to="/dashboard">
      {{ $t('mercadoPago.success.dashboard') }}
    </router-link>
  </div>
</template>

<style scoped>
.mp-success { max-width: 480px; margin: 4rem auto; text-align: center; }
</style>
