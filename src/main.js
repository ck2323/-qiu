import Vue from 'vue'
import App from './App.vue'

// 导入router
import router from'./lib/router'

import http from './lib/http'
Vue.use(http)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
