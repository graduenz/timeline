import axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    timeline: {},
    items: [],
    updateError: null,
  }),
  getters: {
    timeline: state => state.timeline,
    items: state => state.items,
    updateError: state => state.updateError,
  },
  mutations: {
    set: function(state, payload) {
      state.timeline = payload.timeline;
      state.items = payload.items;
    },
    clear: function(state) {
      state.timeline = {};
      state.items = [];
    },
    clearUpdateError: function(state) {
      state.updateError = null;
    },
    setExistingSharedAliasError: function(state) {
      state.updateError = `A timeline with the public alias "${state.timeline.data.shared_alias}" already exists, please try another!`;
    },
  },
  actions: {
    async load({ commit }, id) {
      await commit("clear");
      let response = await axios.get(`/.netlify/functions/timeline-get/${id}`);
      const timeline = response.data;

      response = await axios.get(`/.netlify/functions/items-fetch/${id}`);
      const items = response.data;

      await commit("set", {
        timeline,
        items,
      });
    },
    async update({ getters, commit }, id) {
      await commit("clearUpdateError");
      const { name, description, shared_alias } = getters.timeline.data;
      try {
        await axios.put(`/.netlify/functions/timeline-update/${id}`, {
          name,
          description,
          shared_alias,
          public: getters.timeline.data.public,
        });
      }
      catch (err) {
        if (err.response.data.message === "instance not unique") {
          commit("setExistingSharedAliasError");
        }
        else {
          throw err;
        }
      }
    },
    async delete(ctx, id) {
      await axios.delete(`/.netlify/functions/timeline-delete/${id}`);
    },
    async saveItems({ getters }, id) {
      let order = 0;
      getters.items.forEach(m => m.data.order = ++order);
      
      await axios.post(`/.netlify/functions/items-save/${id}`, getters.items);

      getters.items.forEach(m => m.isNew = false);
    },
  },
}