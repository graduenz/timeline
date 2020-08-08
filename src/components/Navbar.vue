<template>
  <b-navbar toggleable="lg" type="dark" class="bg-primary p-3">
    <div class="container">
      <a class="navbar-brand text-center" href="/">
        <img src="@/assets/img/logo_nav.png" class="d-inline-block my-auto" height="30px">
      </a>
      <b-navbar-toggle target="nav-primary" class="navbar-toggler collapsed">
        <span class="navbar-toggler-icon"></span>
      </b-navbar-toggle>
      <b-collapse is-nav id="nav-primary" v-if="hasUser">
        <ul class="navbar-nav ml-lg-auto mt-lg-0 mt-3 px-lg-0 px-3 py-3 py-md-0">
          <li class="nav-item">
            <router-link to="/timelines" class="nav-link">
              Timelines
              <span class="sr-only">(current)</span>
            </router-link>
          </li>
          <b-nav-item-dropdown right>
            <template slot="button-content">
              <font-awesome-icon :icon="[ 'fas', 'user' ]" />
              {{ user.user_metadata.full_name || user.email }}
            </template>
            <b-dropdown-item @click="$router.push('/account')">Account settings</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="signOutAndRedirect">Sign out</b-dropdown-item>
          </b-nav-item-dropdown>
        </ul>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("auth", [
      "hasUser",
      "user",
    ]),
  },
  methods: {
    ...mapActions("auth", [
      "signOut",
    ]),
    async signOutAndRedirect() {
      await this.signOut();
      this.$router.replace("/");
    }
  },
}
</script>