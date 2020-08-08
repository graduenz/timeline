<template>
  <b-container class="mt-4">
    <b-row>
      <b-col class="d-lg-flex">
        <h3 class="heading-2 mr-4 flex-grow-1">Timelines</h3>
        <b-button variant="success" size="sm" class="mt-2 mt-lg-0 d-block d-lg-inline-block" v-b-modal="'modal-new'">
          <span class="btn-wrapper--icon">
              <font-awesome-icon icon="plus" />
            </span>
            <span class="btn-wrapper--label">Create new</span>
        </b-button>
        <b-modal id="modal-new" title="New timeline" centered :hide-footer="true">
          <b-form @submit="createNew_submit">
            <b-form-group label="Name:"
                          label-for="name">
              <b-input name="name"
                       v-model="newTimeline.name"
                       required
                       placeholder="Name" />
            </b-form-group>
            <b-form-group label="Description (optional):"
                          label-for="description">
              <b-textarea name="description"
                          v-model="newTimeline.description"
                          placeholder="Description" />
            </b-form-group>
            <b-form-group>
              <b-button variant="primary"
                        type="submit"
                        class="float-right">
                Create
              </b-button>
            </b-form-group>
          </b-form>
        </b-modal>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="6" xl="4" v-for="item in timelines" :key="item.ref['@ref'].id">
        <b-card class="mt-4 record">
          <slot header>
            <div class="d-flex mb-2">
              <router-link :to="`/timeline/${item.ref['@ref'].id}`"
                           class="font-size-xl text-nowrap record-title flex-grow-1">
                {{ item.data.name }}
              </router-link>
            </div>
          </slot>
          <b-card-text>
            {{ item.data.description }}
          </b-card-text>
          <slot footer>
            <small :class="item.data.public ? 'text-success' : 'text-warning'">
              <font-awesome-icon :icon="item.data.public ? 'share' : 'lock'" />
              {{ item.data.public ? 'Public' : 'Private' }}
            </small>
          </slot>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<style lang="sass" scoped>
.record
  .record-title
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
</style>

<script>
import { mapActions, mapGetters }  from "vuex";

export default {
  data: function() {
    return {
    };
  },
  computed: {
    ...mapGetters("timelines", [
      "timelines",
      "newTimeline",
      "newTimelineId"
    ]),
  },
  created() {
    this.fetchTimelines();
  },
  methods: {
    ...mapActions("timelines", [
      "fetchTimelines",
      "createNew",
    ]),
    async createNew_submit(event) {
      event.preventDefault();
      await this.createNew();
      this.$router.push(`/timeline/${this.newTimelineId}`);
    }
  },
}
</script>
