<template>
  <v-card
    :disabled="isLoading"
    :loading="isLoading"
    class="mx-auto"
    max-width="700"
    outlined
    rounded="lg"
  >
    <v-card-title>התחברות</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          filled
          v-model="email"
          :rules="emailRules"
          label="דוא˝ל"
          required
        ></v-text-field>

        <v-text-field
          type="password"
          filled
          v-model="password"
          :rules="passwordRules"
          label="סיסמה"
          required
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
            :disabled="!valid"
            @click="validate"
          >
            <span class="font-weight-bold" style="font-size: 16px">התחבר</span>
          </v-btn>
        </div>
      </v-form>

      <v-divider class="my-5"></v-divider>

      <div class="text-center">
        <router-link to="/signup">
          אין לך חשבון אצלנו?
          <strong>הרשם עכשיו!</strong>
        </router-link>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    isLoading: false,
    error: null,
    valid: true,
    email: null,
    password: null,
    emailRules: [
      (v) => !!v || "שדה חובה",
      (v) => /.+@.+\..+/.test(v) || "דואל לא תקין",
    ],
    passwordRules: [
      (v) => !!v || "שדה חובה",
      (v) => (v && v.length >= 6) || "מינימום 6 תווים",
    ],
  }),
  created() {
    this.$store.dispatch("auth/tryLogin");
  },
  methods: {
    async validate() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.isLoading = true;
      try {
        const payload = { email: this.email, password: this.password };
        await this.$store.dispatch("auth/login", payload);
        this.$router.replace("/");
      } catch (error) {
        this.error = error.message;
      }
      this.isLoading = false;
    },
  },
};
</script>
