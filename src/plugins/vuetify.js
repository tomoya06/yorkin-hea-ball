import Vue from 'vue'
// import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

import Vuetify, { VSnackbar } from 'vuetify/lib'
import VuetifyToast from 'vuetify-toast-snackbar'

import { Ripple } from 'vuetify/lib/directives'

// Vue.use(Vuetify, {
//   iconfont: 'md',
// })

Vue.use(Vuetify, {
  iconfont: 'md',
  components: {
    VSnackbar
  },
  directives: {
    Ripple
  }
})

Vue.use(VuetifyToast, {
  color: 'black',
  x: 'center',
})
