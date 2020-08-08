<template>
  <b-container>
    <b-row class="pt-3 pb-4 header"
           v-if="timeline.data">
      <b-col>
        <div class="mt-2 text-center">
          <span class="h1 font-weight-bold">{{ timeline.data.name }}</span>
        </div>
        <div class="mt-2 mb-2 text-center">
          {{ timeline.data.description }}
        </div>
      </b-col>
    </b-row>
    <b-row>
      <div id="timeline"
           class="mt-4 ml-4">
        <section v-for="(item, index) in items"
                  :key="index"
                  class="group">
          <div class="title d-flex">
            <span class="dot"></span>
            <span class="flex-grow-1">{{ item.data.title }}</span>
          </div>
          <ul>
            <li v-for="(entry, index) in item.data.entries"
                :key="index">
              {{ entry.text }}
            </li>
          </ul>
        </section>
      </div>
    </b-row>
  </b-container>
</template>

<style lang="sass">
@import "../assets/timeline.scss";
</style>

<script>
import { mapActions, mapGetters }  from "vuex";

export default {
  computed: {
    ...mapGetters("timelineView", [
      "timeline",
      "items",
    ]),
  },
  async created() {
    await this.load(this.$route.params.alias);
  },
  methods: {
    ...mapActions("timelineView", [
      "load",
    ]),
  },
}
</script>