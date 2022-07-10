import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from "bootstrap-vue";
import "@/assets/scss/app.scss";
import "material-icons/iconfont/material-icons.css";
Vue.use(BootstrapVue);
import VueScreen from "vue-screen";
Vue.use(VueScreen, "bootstrap");
Vue.config.productionTip = false;
import vClickOutside from "v-click-outside";
Vue.use(vClickOutside);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
