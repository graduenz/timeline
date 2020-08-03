<template>
  <div>
    <b-alert :variant="signUpData.status.success ? 'success' : 'danger'"
             :dismissible="showForm"
             v-model="showAlert">
      {{ signUpData.status.message }}
    </b-alert>
    <b-form class="text-left" @submit="submit" v-show="showForm">
      <b-form-group label="Your name:" label-for="name">
        <b-form-input id="name" required placeholder="Your name" v-model="signUpData.name" />
      </b-form-group>
      <b-form-group label="Email:" label-for="email">
        <b-form-input id="email" type="email" required placeholder="Email" v-model="signUpData.email" />
      </b-form-group>
      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" type="password" required placeholder="Password" v-model="signUpData.password" />
      </b-form-group>
      <b-button type="submit" variant="primary" block>Sign up</b-button>
    </b-form>
    <div class="mt-4" v-show="showForm">
      Already have an account? <a href="#" @click="$emit('signInInstead')">Sign in</a> instead.
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data: function() {
    return {
      showForm: true,
      showAlert: false,
    };
  },
  computed: {
    ...mapGetters("auth", [
      "signUpData",
    ]),
  },
  methods: {
    ...mapActions("auth", [
      "signUp",
    ]),
    async submit(event) {
      event.preventDefault();
      await this.signUp();
      this.showAlert = true;
      if (this.signUpData.status.success) {
        this.showForm = false;
      }
    },
  },
}
</script>