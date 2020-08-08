<template>
  <b-container class="mt-4">
    <template v-if="!checked">
      <font-awesome-icon class="d-block mb-4" icon="spinner" spin />
    </template>
    <template v-else-if="confirmData.status.success">
      <h1>Congratulations!</h1>
      <p>{{ confirmData.status.message }}</p>
    </template>
    <template v-else>
      <h1>Ops!</h1>
      <p>Something went wrong with your user confirmation. Didn't you already confirm it?</p>
    </template>
    <b-button variant="primary" @click="$router.replace('/')">
      Go to home page
    </b-button>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: function() {
    return {
      checked: false,
    };
  },
  computed: {
    ...mapGetters("auth", [
      "confirmData",
    ]),
  },
  async created() {
    await this.confirm(this.$route.params.pathMatch);
    this.checked = true;
  },
  methods: {
    ...mapActions("auth", [
      "confirm"
    ]),
  },
}
</script>
