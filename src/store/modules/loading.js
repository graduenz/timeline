export default {
  namespaced: true,
  state: () => ({
    loading: 0,
  }),
  getters: {
    loading: function(state) {
      return state.loading;
    },
  },
  mutations: {
    startLoading: function(state) {
      ++state.loading;
    },
    finishLoading: function(state) {
      --state.loading;
    },
  },
}