<template>
  <b-container fluid>
    <b-row class="bg-white pt-3 pb-4 header"
           v-if="timeline.data">
      <b-col>
        <b-container>
          <template v-if="!edit">
            <div class="mt-2">
              <span class="h3 font-weight-bold">{{ timeline.data.name }}</span>
              <b-badge :variant="timeline.data.public ? 'neutral-success' : 'neutral-warning'"
                      :class="['ml-2', timeline.data.public ? 'text-success' : 'text-warning']">
                {{ timeline.data.public ? 'Public' : 'Private' }}
              </b-badge>
            </div>
            <div class="mt-2 mb-2">
              {{ timeline.data.description }}
            </div>
            <small class="d-flex flex-wrap mb-2"
                  v-if="timeline.data.public">
              <b class="mr-1">Link to share:</b>
              <a :href="`https://timeline.rdnz.dev/#/t/${timeline.data.shared_alias}`"
                target="_blank"
                class="mr-1">
                https://timeline.rdnz.dev/#/t/{{ timeline.data.shared_alias }}
              </a>
              <font-awesome-icon icon="copy"
                                style="cursor: pointer"
                                @click="copyLinkToClipboard" />
            </small>
            <b-button variant="primary"
                      class="mt-2 mt-lg-0"
                      @click="editClick">
              <span class="btn-wrapper--icon">
                <font-awesome-icon icon="edit" />
              </span>
            </b-button>
          </template>
          <template v-else>
            <div class="mt-2 mb-2">
              <b-input v-model="timeline.data.name"
                      required
                      placeholder="Timeline name" />
              <b-textarea v-model="timeline.data.description"
                          class="mt-2"
                          placeholder="Description (optional)" />
              <b-checkbox v-model="timeline.data.public"
                          class="mt-2"
                          switch>
                Public
              </b-checkbox>
              <b-form-group v-if="timeline.data.public"
                            description="This alias will be used to share your timeline"
                            class="mt-2">
                <b-input-group prepend="https://timeline.rdnz.dev/#/t/">
                  <b-input v-model="timeline.data.shared_alias"
                          :required="timeline.data.public"
                          placeholder="Alias for sharing" />
                </b-input-group>
              </b-form-group>
              <b-alert variant="danger" v-model="showErrorAlert" dismissible>
                {{ updateError }}
              </b-alert>
            </div>
            <b-button variant="success"
                      class="mt-2 mt-lg-0"
                      @click="saveClick">
              <span class="btn-wrapper--icon">
                <font-awesome-icon icon="save" />
              </span>
            </b-button>
          </template>
          <b-button variant="danger"
                    class="mt-2 mt-lg-0 ml-2"
                    v-b-modal="'modal-delete'">
            <span class="btn-wrapper--icon">
              <font-awesome-icon icon="trash" />
            </span>
          </b-button>
          <b-modal id="modal-delete"
                  title="Delete timeline"
                  ok-title="Delete"
                  ok-variant="danger"
                  centered
                  @ok="delete_ok">
            Are you sure you want to delete this timeline?
          </b-modal>
        </b-container>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-container v-if="isLoadingItems">
          <font-awesome-icon icon="spinner"
                             spin
                             class="mt-4" />
        </b-container>
        <b-container v-else>
          <TimelineEditor :dirty="dirty"
                          :timeline="timeline"
                          :items="items"
                          class="mt-4"
                          @save="editorSave" />
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<style lang="sass" scoped>
.header
  border-bottom: 1px solid rgba(7, 9, 25, 0.1);
</style>

<script>
import { mapActions, mapGetters }  from "vuex";

import TimelineEditor from "@/components/TimelineEditor";

export default {
  components: {
    TimelineEditor,
  },
  data: function() {
    return {
      dirty: false,
      edit: false,
      loaded: false,
      showErrorAlert: false,
    };
  },
  computed: {
    ...mapGetters("timeline", [
      "timeline",
      "items",
      "isLoadingItems",
      "updateError",
    ]),
  },
  watch: {
    items: {
      handler: function() {
        if (this.loaded) this.dirty = true;
      },
      deep: true,
    },
  },
  async created() {
    await this.load(this.$route.params.id);
    this.loaded = true;
  },
  methods: {
    ...mapActions("timeline", [
      "load",
      "update",
      "delete",
      "saveItems",
    ]),
    async delete_ok() {
      await this.delete(this.$route.params.id);
      this.$router.push("/timelines");
    },
    editClick() {
      this.edit = true;
    },
    async saveClick() {
      await this.update(this.$route.params.id);
      if (this.updateError) {
        this.showErrorAlert = true;
      }
      else {
        this.edit = false;
      }
    },
    async editorSave() {
      await this.saveItems(this.$route.params.id);
      this.dirty = false;
    },
    copyLinkToClipboard() {
      navigator.clipboard.writeText(`https://timeline.rdnz.dev/#/t/${this.timeline.data.shared_alias}`)
        .then(() => {
          //TODO: Positive feedback
        })
        .catch(() => {
          //TODO: Negative feedback
        });
    }
  },
}
</script>