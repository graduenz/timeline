<template>
  <div class="mt-4">
    <b-container v-if="isUserConfirm">
      <b-alert v-if="confirmData.status.success"
               variant="success"
               class="d-flex align-items-center pl-2 align-content-center"
               show
               dismissible>
        <span class="font-size-lg d-block d-40 mr-2 text-center">
          <font-awesome-icon icon="check"/>
        </span>
        <span>
          <strong class="d-block">Congratulations!</strong> {{ confirmData.status.message }}
        </span>
      </b-alert>
    </b-container>
    <Welcome :isUserConfirm="isUserConfirm && confirmData.status.success" />
  </div>
</template>

<script>
import Welcome from "@/components/Welcome";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Welcome,
  },
  data: function() {
    return {
      isUserConfirm: false,
    };
  },
  computed: {
    ...mapGetters("auth", [
      "hasUser",
      "confirmData",
    ]),
  },
  async created() {
    if (this.hasUser) {
      this.$router.replace("/timelines");
      return false;
    }
    await this.tryConfirmUser();
  },
  methods: {
    ...mapActions("auth", [
      "confirm"
    ]),
    async tryConfirmUser() {
      const match = this.$route.hash.match(/#confirmation_token=(.+)/);
      if (match && match.length > 0) {
        this.isUserConfirm = true;
        await this.confirm(match[1]);
      }
    },
  }
}
</script>
