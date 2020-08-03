import axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    timeline: {},
    items: [],
  }),
  getters: {
    timeline: state => state.timeline,
    items: state => state.items,
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
  },
  actions: {
    async load({ commit }, alias) {
      await commit("clear");
      let response = await axios.get(`/.netlify/functions/timeline-get-by-alias/${alias}`);
      const timeline = response.data;

      response = await axios.get(`/.netlify/functions/items-fetch/${timeline.ref["@ref"].id}`);
      const items = response.data;

      await commit("set", {
        timeline,
        items,
      });
    },
  },
}