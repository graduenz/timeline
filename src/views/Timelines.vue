<template>
  <b-container class="mt-4">
    <b-row>
      <b-col class="d-lg-flex">
        <h3 class="heading-2 mr-4 flex-grow-1">Timelines</h3>
        <b-button variant="success"
                  v-if="timelines && timelines.length > 0"
                  size="sm"
                  class="mt-2 mt-lg-0 d-block d-lg-inline-block"
                  v-b-modal="'modal-new'">
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
    <b-row v-if="isLoadingTimelines">
      <font-awesome-icon class="d-block mt-4" icon="spinner" spin />
    </b-row>
    <b-row v-else-if="timelines && timelines.length > 0">
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
    <b-row v-else>
      <b-col class="text-center mt-4">
        <img src="@/assets/svg/undraw_no_data_qbuo.svg" width="256" class="mb-4" />
        <h3>No timelines found.</h3>
        <p>Why don't create your first one?</p>
        <b-button variant="success"
                  class="mt-2 mt-lg-0 d-block d-lg-inline-block"
                  v-b-modal="'modal-new'">
          <span class="btn-wrapper--icon">
              <font-awesome-icon icon="plus" />
            </span>
            <span class="btn-wrapper--label">Create my first timeline</span>
        </b-button>
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
      "isLoadingTimelines",
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
