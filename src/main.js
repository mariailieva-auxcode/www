import Vue from 'vue'
import App from './App.vue'
import Router from './router'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import VueLazyImageLoading from 'vue-lazy-image-loading'
import VueScrollTo from 'vue-scrollto'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueLazyImageLoading)
Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: -100,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

new Vue({
  router: Router,
  render: h => h(App),
}).$mount('#app')
