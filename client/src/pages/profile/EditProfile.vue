<template>
  <v-card
    :disabled="isLoading"
    :loading="isLoading"
    class="mx-auto"
    max-width="700"
    outlined
    rounded="lg"
  >
    <!-- <v-card-title>יצירת ספר חדש</v-card-title> -->
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          outlined
          v-model="user.firstName"
          label="שם פרטי"
          readonly
        ></v-text-field>

        <v-text-field
          outlined
          v-model="user.lastName"
          label="שם משפחה"
          readonly
        ></v-text-field>

        <v-text-field
          outlined
          v-model="user.email"
          label="דוא˝ל"
          readonly
        ></v-text-field>

        <v-alert v-if="!!error" dense text type="error">
          {{ error }}
        </v-alert>

        <div class="text-center">
          <v-btn
            color="success"
            min-width="170px"
            min-height="50px"
            large
            depressed
            :loading="isLoading"
            :disabled="valid"
            @click="submitForm"
          >
            <span class="font-weight-bold" style="font-size: 16px">שמור</span>
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    isLoading: false,
    error: null,
    valid: false,
    user: {
      firstName: "",
      lastName: "",
      email: "",
    },
  }),
  computed: {
    userDetails() {
      return this.$store.getters["auth/user"];
    },
  },
  created() {
    this.user.firstName = this.userDetails.firstName;
    this.user.lastName = this.userDetails.lastName;
    this.user.email = this.userDetails.email;
  },
  methods: {
    submitForm() {
      console.log("sd");
    },
  },
};
</script>

<style></style>
