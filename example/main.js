import Vue from 'vue'
import App from './App.vue'

import CUi from 'main/index.js'

Vue.use(CUi)

new Vue({
  render: h => h(App)
}).$mount('#app')