import axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    timelines: [],
    newTimeline: {
      name: null,
      description: null,
    },
    newTimelineId: null,
  }),
  getters: {
    timelines: state => state.timelines,
    newTimeline: state => state.newTimeline,
    newTimelineId: state => state.newTimelineId,
  },
  mutations: {
    clearTimelines: function(state) {
      state.timelines = [];
    },
    setTimelines: function(state, payload) {
      state.timelines = payload;
    },
    setNewTimelineId: function(state, payload) {
      state.newTimelineId = payload;
    },
    resetNewTimeline: function(state) {
      state.newTimeline = {
        name: null,
        description: null,
      };
    },
  },
  actions: {
    async fetchTimelines({ commit }) {
      commit("clearTimelines");
      const response = await axios.get("/.netlify/functions/timeline-fetch");
      await commit("setTimelines", response.data);
    },
    async createNew({ getters, commit }) {
      const response = await axios.post("/.netlify/functions/timeline-create", {
        ...getters.newTimeline,
      });
      commit("resetNewTimeline");
      await commit("setNewTimelineId", response.data.ref["@ref"].id);
    },
  },
}