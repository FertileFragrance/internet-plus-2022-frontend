import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import AFTableColumn from "af-table-column";
import router from "./router";
import * as echarts from "echarts";
import store from "./store";
//注入echarts全局
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(AFTableColumn);

new Vue({
  router,
  render: (h) => h(App),
  store,
}).$mount("#app");
