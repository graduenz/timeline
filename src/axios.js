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
  }, async error => {
    store.commit("loading/finishLoading");
    if (error.response && error.response.status === 401) {
      if (!session.hasUser()) {
        window.location = "/";
        return Promise.reject(error);
      }

      const user = session.getUser();
      
      var body = new FormData();
      body.append("grant_type", "refresh_token");
      body.append("refresh_token", user.token.refresh_token);
      
      const response = await axios.post(
        `/.netlify/identity/token`,
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
      
        if (response.status === 200) {
          user.token = response.data;
          session.setUser(user);

          error.config.headers["Authorization"] = axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;
          return axios.request(error.config);
        }
    }
    
    return Promise.reject(error);
  });
  
  if (session.hasUser()) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${session.getUser().token.access_token}`;
  }
}