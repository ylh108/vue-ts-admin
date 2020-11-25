import { filterRepeat } from '@/utils/index.ts'
import store from '@/store'

export default {
    namespaced: true,
    state: {
        tags: [],
        active: null,
        contextTag: {}
    },
    mutations: {
        SET_TAGS (state: any, tags: any) {
            if (!tags) {
                tags = {
                    name: '首页',
                    navigation: '',
                    value: '/home'
                }
            }
            if (tags.close) {
                const array = state.tags.filter((item: any, index: number) => {
                    if (state.active === item.value && state.active === tags.value) {
                        store.commit('tags/SET_ACTIVE', state.tags[index - 1].value)
                        store.commit('header/SET_NAVIGATION', state.tags[index - 1].navigation)
                    }
                    return !item.close
                })
                state.tags = array
            } else if (tags.closeOther) {
                const obj = JSON.parse(JSON.stringify(state.tags))
                tags.children.forEach((childItem: any) => {
                    obj.forEach((item: any, index: number) => {
                        if (item.name === tags.name) {
                            store.commit('tags/SET_ACTIVE', item.value)
                            store.commit('header/SET_NAVIGATION', item.navigation)
                        }
                        if (childItem.value === item.value) {
                            state.tags.splice(state.tags.findIndex((tagsItem: any) => tagsItem.value === item.value), 1)
                        }
                    })
                })
            } else if (tags.closeAll) {
                tags = {
                    name: '首页',
                    navigation: '',
                    value: '/home'
                }
                store.commit('tags/SET_ACTIVE')
                store.commit('header/SET_NAVIGATION')
                state.tags = []
                state.tags.push(tags)
            } else {
                state.tags.push(tags)
            }
            state.tags = filterRepeat(state.tags, 'value')
            sessionStorage.setItem('tags', JSON.stringify(state.tags))
        },
        SET_ACTIVE (state: any, active: string) {
            state.active = active || '/home'
            sessionStorage.setItem('tagsActive', state.active)
        },
        SET_CONTEXTTAG (state: any, payload: any) {
            state.contextTag = Object.assign({}, state.contextTag, payload)
        }
    },
    getters: {
        getTags (state: any) {
            if (!state.tags.length) {
                let tags: any = sessionStorage.getItem('tags')
                state.tags = JSON.parse(tags)
            }
            return state.tags
        },
        getActive (state: any) {
            if (!state.active) {
                let active: any = sessionStorage.getItem('tagsActive')
                state.active = active
            }
            return state.active
        },
        getContextTag (state: any) {
            return state.contextTag
        }
    },
    actions: {}
}
