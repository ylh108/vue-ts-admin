export default {
    namespaced: true,
    state: {
        userName: ''
    },
    mutations: {
        SET_USERNAME (state: any, payload: any) {
            sessionStorage.setItem('userName', payload)
            state.userName = payload
        }
    },
    getters: {
        getUserName (state: any) {
            if (!state.userName) {
                state.userName = sessionStorage.getItem('userName')
            }
            return state.userName
        }
    },
    actions: {}
}
