import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import lodash from 'lodash'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

Vue.prototype.$_ = lodash
Vue.prototype.host = 'http://localhost:3000'

Vue.use(VueAxios, axios)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
