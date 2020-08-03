import axios from "axios";
import store from "@/store";
import session from "@/services/session";

export function setupAxios() {
  axios.interceptors.request.use(config => {
    store.commit("loading/startLoading");
    return config;
  }, error => {
    store.commit("loading/finishLoading");
    return Promise.reject(error);
  });
  axios.interceptors.response.use(response => {
    store.commit("loading/finishLoading");
    return response;
  }, error => {
    store.commit("loading/finishLoading");
    return Promise.reject(error);
  });
  
  //TODO: Use cookies instead
  if (session.hasUser()) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${session.getUser().token.access_token}`;
  }
}