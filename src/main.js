import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import lodash from 'lodash'

Vue.config.productionTip = false

Vue.prototype.$_ = lodash

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
