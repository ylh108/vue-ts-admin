import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import sliderMenu from './modules/sliderMenu'
import header from './modules/header'
import tags from './modules/tags'
import content from './modules/content'
import lang from './modules/lang'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        login,
        sliderMenu,
        header,
        tags,
        content,
        lang
    }
})
