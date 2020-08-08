import axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    timeline: {},
    items: [],
    isLoadingItems: true,
    updateError: null,
  }),
  getters: {
    timeline: state => state.timeline,
    items: state => state.items,
    isLoadingItems: state => state.isLoadingItems,
    updateError: state => state.updateError,
  },
  mutations: {
    setTimeline: function(state, payload) {
      state.timeline = payload;
    },
    clearTimeline: function(state) {
      state.timeline = {};
    },
    setItems: function(state, payload) {
      state.items = payload;
    },
    setLoadingItems: function(state, payload) {
      state.isLoadingItems = payload;
    },
    clearItems: function(state) {
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
    async load({ commit, dispatch }, id) {
      await commit("clearTimeline");
      await commit("clearItems");

      const response = await axios.get(`/.netlify/functions/timeline-get/${id}`);
      await commit("setTimeline", response.data);

      await dispatch("loadItems", id);
    },
    async loadItems({ commit }, id) {
      await commit("setLoadingItems", true);
      const response = await axios.get(`/.netlify/functions/items-fetch/${id}`);
      await commit("setLoadingItems", false);
      await commit("setItems", response.data);
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
    async saveItems({ getters, commit, dispatch }, id) {
      const items = getters.items;
      await commit("clearItems");
      await commit("setLoadingItems", true);

      let order = 0;
      getters.items.forEach(m => m.data.order = ++order);
      
      await axios.post(`/.netlify/functions/items-save/${id}`, items);
      await dispatch("loadItems", id);
    },
  },
}