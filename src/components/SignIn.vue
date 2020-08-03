<template>
  <div>
    <b-alert variant="danger"
             dismissible
             v-model="showAlert">
      {{ signInData.status.message }}
    </b-alert>
    <b-form class="text-left" @submit="submit">
      <b-form-group label="Email:" label-for="email">
        <b-form-input id="email" type="email" required placeholder="Email" v-model="signInData.email" />
      </b-form-group>
      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" type="password" required placeholder="Password" v-model="signInData.password" />
      </b-form-group>
      <b-button type="submit" variant="primary" block>Sign in</b-button>
    </b-form>
    <div class="mt-4">
      <router-link to="/lost-password">Forgot you password?</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data: function() {
    return {
      showAlert: false,
    };
  },
  computed: {
    ...mapGetters("auth", [
      "signInData",
      "user",
    ]),
  },
  methods: {
    ...mapActions("auth", [
      "signIn",
    ]),
    async submit(event) {
      event.preventDefault();
      await this.signIn();
      if (this.signInData.status.success) {
        this.$router.push("/timelines");
      }
      else {
        this.showAlert = true;
      }
    },
  },
}
</script>