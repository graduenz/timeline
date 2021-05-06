import GoTrue from "gotrue-js";
import axios from "axios";

import session from "@/services/session";

export default {
  namespaced: true,
  state: () => ({
    session,
    auth: null,
    user: session.hasUser() ? session.getUser() : null,
    signUpData: {
      name: null,
      email: null,
      password: null,
      status: {
        success: true,
        message: null,
      },
    },
    signInData: {
      email: null,
      password: null,
      status: {
        success: true,
        message: null,
      },
    },
    confirmData: {
      status: {
        success: false,
        message: null,
      },
    },
  }),
  getters: {
    auth: function(state) {
      if (!state.auth) {
        state.auth = new GoTrue({
          APIUrl: "https://timeline.rdnz.dev/.netlify/identity",
          audience: "",
          setCookie: false,
        });

        return state.auth;
      }
    },
    hasUser: state => !!state.user,
    user: state => state.user,
    signUpData: state => state.signUpData,
    signInData: state => state.signInData,
    confirmData: state => state.confirmData,
  },
  mutations: {
    setUser: function(state, payload) {
      state.user = payload;
      state.session.setUser(payload);
      axios.defaults.headers.common["Authorization"] = `Bearer ${payload.token.access_token}`;
    },
    removeUser: function(state) {
      state.user = null;
      state.session.removeUser();
    },
    setSignUpStatus: function(state, payload) {
      state.signUpData.status = payload;
    },
    setSignInStatus: function(state, payload) {
      state.signInData.status = payload;
    },
    setConfirmStatus: function(state, payload) {
      state.confirmData.status = payload;
    },
  },
  actions: {
    startLoading({ commit }) {
      commit("loading/startLoading", null, { root: true });
    },
    finishLoading({ commit }) {
      commit("loading/finishLoading", null, { root: true });
    },
    async signUp({ getters, commit, dispatch }) {
      try {
        dispatch("startLoading");
        await getters.auth.signup(getters.signUpData.email, getters.signUpData.password, { full_name: getters.signUpData.name });
        await commit("setSignUpStatus", {
          success: true,
          message: "Account created successfully, please verify your e-mail!",
        });
      }
      catch (err) {
        if (err.name === "JSONHTTPError") {
          await commit("setSignUpStatus", {
            success: false,
            message: err.json.msg,
          });
        }
        else {
          await commit("error", err, { root: true });
        }
      }
      finally {
        dispatch("finishLoading");
      }
    },
    async signIn({ getters, commit, dispatch }) {
      try {
        dispatch("startLoading");
        const response = await getters.auth.login(getters.signInData.email, getters.signInData.password);
        await commit("setUser", response);
        await commit("setSignInStatus", {
          success: true,
          message: "Signed in successfully! Redirecting...",
        });
      }
      catch (err) {
        if (err.name === "JSONHTTPError") {
          await commit("setSignInStatus", {
            success: false,
            message: err.json.error_description,
          });
        }
        else {
          await commit("error", err, { root: true });
        }
      }
      finally {
        dispatch("finishLoading");
      }
    },
    async signOut({ commit }) {
      await commit("removeUser");
    },
    /*async continueWithExternal() {

    },*/
    async confirm({ getters, commit, dispatch }, token) {
      try {
        dispatch("startLoading");
        await getters.auth.confirm(token);
        await commit("setConfirmStatus", {
          success: true,
          message: "Your account is now verified! Just sign in.",
        });
      }
      catch (err) {
        if (err.name === "JSONHTTPError") {
          await commit("setConfirmStatus", {
            success: false,
            message: err.json.msg,
          });
        }
        else {
          await commit("error", err, { root: true });
        }
      }
      finally {
        dispatch("finishLoading");
      }
    },
  },
}