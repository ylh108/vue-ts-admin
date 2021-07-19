import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from '@/store'
import ElementUI from 'element-ui'
import i18n from './lang'
import { print } from '@/utils/print'
import { elPrint } from '@/utils/elPrint'
import './filters'
import 'element-ui/lib/theme-chalk/index.css'
import './mock'

Vue.use(ElementUI, {
    i18n: (key: string, value: string) => i18n.t(key, value)
})

Vue.prototype.$axios = axios
Vue.prototype.$print = print
Vue.prototype.$elPrint = elPrint

Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
