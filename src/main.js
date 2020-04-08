// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import QS from 'qs'
import md5 from 'js-md5';
import dateFormat from "@/utils/dateFormat"
import vGallery from 'v-gallery'
import store from './store'

Vue.prototype.qs = QS;
Vue.prototype.$axios = axios;
Vue.prototype.$md5 = md5;
Vue.prototype.$serverPath = "http://172.19.241.1:8080/api";
Vue.prototype.$websocketPath = "ws://172.17.241.1:8080/api/chat"
Vue.prototype.$websocket = null;
Date.prototype.Format = dateFormat.formatDate;

Vue.use(ElementUI)
Vue.use(axios)
Vue.use(vGallery)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
