import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueCompositonApi from '@vue/composition-api'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/main.scss'
import mySvg from '@/components/svg'
Vue.use(ElementUI)
Vue.use(VueCompositonApi)
Vue.use(mySvg)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
