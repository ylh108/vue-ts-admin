export default {
    namespaced: true,
    state: {
        isSliderZoom: false, // 侧边栏切换
        isFixedZoom: false, // 侧边栏固定
        navigation: null, // 导航
        navigationList: [] // 所有的导航列表
    },
    mutations: {
        SET_SLIDERZOOM (state: any, payLoad: any) {
            sessionStorage.setItem('isSliderZoom', payLoad)
            state.isSliderZoom = payLoad
        },
        SET_FIXEDZOOM (state: any, payLoad: any) {
            sessionStorage.setItem('isFixedZoom', payLoad)
            state.isFixedZoom = payLoad
        },
        SET_NAVIGATIONLIST (state: any, payLoad: any) {
            let getNavigationList: any = (list: any, pre: string = '') => {
                let result: any = []
                list.forEach((item: any) => {
                    const obj = {
                        name: pre + '/' + item.name,
                        value: item.path
                    }
                    result.push(obj)
                    if (item.children && item.children.length) {
                        result = result.concat(getNavigationList(item.children, obj.name))
                    }
                })
                return result
            }
            let navigationList = getNavigationList(payLoad)
            sessionStorage.setItem('navigationList', JSON.stringify(navigationList))
            state.navigationList = navigationList
        },
        SET_NAVIGATION (state: any, payLoad: any) {
            state.navigation = payLoad
            sessionStorage.setItem('navigation', state.navigation)
        }
    },
    getters: {
        getIsSliderZoom (state: any) {
            if (!state.isSliderZoom) {
                let isSliderZoom: any = sessionStorage.getItem('isSliderZoom')
                /* eslint-disable */
                state.isSliderZoom = eval(isSliderZoom)
            }
            return state.isSliderZoom
        },
        getIsFixedZoom (state: any) {
            if (!state.isFixedZoom) {
                let isFixedZoom: any = sessionStorage.getItem('isFixedZoom')
                /* eslint-disable */
                state.isFixedZoom = eval(isFixedZoom)
            }
            return state.isFixedZoom
        },
        getNavigationList (state: any) {
            if (!state.navigationList.length) {
                let navigationList: any = sessionStorage.getItem('navigationList')
                state.navigationList = JSON.parse(navigationList)
            }
            return state.navigationList
        },
        getNavigation (state: any) {
            if (state.navigation === null) {
                let navigation: any = sessionStorage.getItem('navigation')
                state.navigation = navigation
            }
            return state.navigation
        }
    },
    actions: {}
}
