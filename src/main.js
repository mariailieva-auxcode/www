import Vue from 'vue'
import App from './App.vue'
import Router from './router'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

new Vue({
  router: Router,
  render: h => h(App),
}).$mount('#app')
