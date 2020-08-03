import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import auth from "./modules/auth";
import loading from "./modules/loading";
import timelines from "./modules/timelines";
import timeline from "./modules/timeline";
import timelineView from "./modules/timelineView";

export default new Vuex.Store({
  state: {
    error: null,
  },
  getters: {
  },
  mutations: {
    error: function(state, payload) {
      state.error = payload;
    },
  },
  actions: {
  },
  modules: {
    auth,
    loading,
    timelines,
    timeline,
    timelineView,
  },
});
