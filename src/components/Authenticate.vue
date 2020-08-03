<template>
  <div>
    <b-tabs pills fill nav-class="w-100 mb-4" nav-wrapper-class="w-100" v-model="tabIndex">
      <b-tab title="Sign up" active>
        <SignUp @signInInstead="signInInstead" />
      </b-tab>
      <b-tab title="Sign in">
        <SignIn />
      </b-tab>
    </b-tabs>
    <hr />
    <b-button variant="google-plus" block disabled>
      <span class="btn-wrapper--icon">
        <font-awesome-icon :icon="[ 'fab', 'google' ]" />
      </span>
      <span class="btn-wrapper--label">Continue with Google</span>
    </b-button>
    <b-button variant="github" block disabled>
      <span class="btn-wrapper--icon">
        <font-awesome-icon :icon="[ 'fab', 'github' ]" />
      </span>
      <span class="btn-wrapper--label">Continue with GitHub</span>
    </b-button>
  </div>
</template>

<script>
import SignUp from "@/components/SignUp";
import SignIn from "@/components/SignIn";

export default {
  components: {
    SignUp,
    SignIn,
  },
  data: function() {
    return {
      tabIndex: 0,
    };
  },
  methods: {
    signInInstead() {
      this.tabIndex = 1;
    }
  },
}
</script>