<template>
  <div class="mt-4">
    <Welcome />
  </div>
</template>

<script>
import Welcome from "@/components/Welcome";

import { mapGetters } from "vuex";

export default {
  components: {
    Welcome,
  },
  data: function() {
    return {
    };
  },
  computed: {
    ...mapGetters("auth", [
      "hasUser",
    ]),
  },
  async created() {
    if (this.hasUser) {
      this.$router.replace("/timelines");
      return false;
    }
  },
}
</script>
