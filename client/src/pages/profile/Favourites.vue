<template>
  <v-card
    :disabled="isLoading"
    :loading="isLoading"
    class="mx-auto"
    max-width="700"
    outlined
    rounded="lg"
  >
    <v-card-text>
      מועדפים
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    isLoading: false,
    error: null,
  }),
  computed: {

  },
  created() {

  },
  methods: {

  },
};
</script>

<style></style>
