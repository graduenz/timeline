import axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    timelines: [],
    isLoadingTimelines: true,
    newTimeline: {
      name: null,
      description: null,
    },
    newTimelineId: null,
  }),
  getters: {
    timelines: state => state.timelines,
    isLoadingTimelines: state => state.isLoadingTimelines,
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
    setLoadingTimelines: function(state, payload) {
      state.isLoadingTimelines = payload;
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
      await commit("clearTimelines");
      await commit("setLoadingTimelines", true);
      const response = await axios.get("/.netlify/functions/timeline-fetch");
      await commit("setLoadingTimelines", false);
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