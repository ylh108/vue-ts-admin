export default {
    namespaced: true,
    state: {
        treeData: []
    },
    mutations: {
        SET_TREEDATA (state: any, payload: any) {
            let cloneData = JSON.parse(JSON.stringify(payload))
            let data = cloneData.filter((father: any) => {
                let branchArr = cloneData.filter((child: any) => father.code === child.parentCode)
                if (branchArr.length) {
                    father.children = branchArr
                }
                return father.parentCode === '0'
            })
            data.unshift({
                path: '/home',
                name: '首页',
                icon: 'el-icon-s-home'
            })
            sessionStorage.setItem('treeData', JSON.stringify(data))
            state.treeData = data
        }
    },
    getters: {
        getTreeData (state: any) {
            if (!state.treeData.length) {
                let treeData: any = sessionStorage.getItem('treeData')
                state.treeData = JSON.parse(treeData)
            }
            return state.treeData
        }
    },
    actions: {}
}
