<template>
  <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
</template>

<script>
export default {
  // Vuetify components provide
  // a theme variable that is
  // used to determine dark
  inject: {
    theme: {
      default: { isDark: false },
    },
  },
};
</script>
