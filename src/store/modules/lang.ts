export default {
    namespaced: true,
    state: {
        lang: ''
    },
    mutations: {
        SET_LANG (state: any, payLoad: string) {
            sessionStorage.setItem('lang', payLoad)
            state.lang = payLoad
        }
    },
    getters: {
        getLang (state: any) {
            if (!state.lang) {
                state.lang = sessionStorage.getItem('lang')
            }
            return state.lang
        }
    },
    actions: {}
}
