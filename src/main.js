import Vue from "vue";
import App from "./App.vue";
import VueMask from "v-mask";
import "./assets/style/global.sass";

Vue.config.productionTip = false;

Vue.use(VueMask);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
