<template>
  <div v-if="timeline.data">
    <b-row>
      <b-col xl="6">
        <draggable :list="items" handle=".drag-group">
          <div v-for="(item, index) in items"
              :key="index"
              class="mb-2">
            <div class="d-flex">
              <font-awesome-icon icon="grip-vertical"
                                 class="mr-2 mt-2 drag-handle drag-group" />
              <b-input-group class="flex-grow-1">
                <b-input v-model="item.data.title"
                        required
                        placeholder="Group title (e.g. July 2020)" />
                <b-input-group-append>
                  <b-button variant="_"
                            @click="removeGroup(index)">
                    <font-awesome-icon icon="trash" />
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </div>
            <div class="ml-4">
              <draggable :list="item.data.entries" handle=".drag-entry">
                <div v-for="(entry, entryIndex) in item.data.entries"
                    :key="entryIndex"
                    class="d-flex">
                  <font-awesome-icon icon="grip-vertical"
                                    class="mr-2 mt-3 drag-handle drag-entry" />
                  <b-input-group class="flex-grow-1 mt-2">
                    <b-input v-model="entry.text"
                            size="sm"
                            required
                            placeholder="Entry text (e.g. Emit passport)" />
                    <b-input-group-append>
                      <b-button variant="_"
                                size="sm"
                                @click="removeEntry(item, entryIndex)">
                        <font-awesome-icon icon="trash" />
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </div>
              </draggable>
              <b-button variant="primary"
                        size="sm"
                        class="mt-2"
                        @click="addEntry(item)">
                <span class="btn-wrapper--icon">
                    <font-awesome-icon icon="plus" />
                  </span>
                  <span class="btn-wrapper--label">Add entry</span>
              </b-button>
            </div>
            <hr />
          </div>
        </draggable>
        <div class="d-lg-flex">
          <div class="flex-grow-1">
            <b-button variant="primary"
                      @click="addGroup">
              <span class="btn-wrapper--icon">
                  <font-awesome-icon icon="plus" />
                </span>
                <span class="btn-wrapper--label">Add group</span>
            </b-button>
          </div>
          <b-button variant="success"
                    class="mt-2 mt-lg-0"
                    @click="$emit('save')"
                    :disabled="!dirty">
            <span class="btn-wrapper--icon">
                <font-awesome-icon icon="save" />
              </span>
              <span class="btn-wrapper--label">Save changes</span>
          </b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<style lang="sass" scoped>
.drag-handle
  color: #9fa4df;
  cursor: move;

.drag-group
  font-size: 1.25rem;

.drag-entry
  font-size: 1rem;
</style>

<script>
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },
  props: {
    dirty: Boolean,
    timeline: Object,
    items: Array,
  },
  data: function() {
    return {
    };
  },
  methods: {
    addGroup() {
      this.items.push({
        isNew: true,
        data: {
          title: "New group",
          entries: [],
        },
      });
    },
    removeGroup(index) {
      this.items.splice(index, 1);
    },
    addEntry(item) {
      item.data.entries.push({
        text: "New entry",
      });
    },
    removeEntry(item, index) {
      item.data.entries.splice(index, 1);
    },
  }
}
</script>