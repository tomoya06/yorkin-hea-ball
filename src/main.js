import Vue from 'vue';
import './plugins/vuetify';
import lodash from 'lodash';
import axios from 'axios';
import qs from 'qs';
import VueAxios from 'vue-axios';
import router from './router';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.prototype.$_ = lodash;
Vue.prototype.qs = qs;
Vue.prototype.host = 'http://localhost:3000';
Vue.prototype.wshost = 'ws://localhost:9999';

Vue.use(VueAxios, axios);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
