import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

/* Font Awesome */
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(fas);
library.add(fab);
Vue.component('font-awesome-icon', FontAwesomeIcon);

/* Bootstrap Vue */
import { BootstrapVue } from 'bootstrap-vue';
Vue.use(BootstrapVue);

/* Loading & progress */
import NProgress from 'nprogress';
import '@/assets/nprogress.css';
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });
store.watch(
  (state) => state.loading.loading,
  (newVal, oldVal) => {
    if (newVal === 0) return NProgress.done();
    if (oldVal === 0) return NProgress.start();
    NProgress.set(1.8 / Math.max(oldVal, newVal));
  },
);

/* Axios */
import { setupAxios } from "./axios";
setupAxios();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
