import store from '@/store'
/**
 * @param isOnload
 * @param maxWidth 如果小于700px侧边栏悬浮，默认800
 */
export function sliderZoom (isOnload?: boolean, maxWidth: Number = 800) {
    let windowWidth = window.innerWidth
    if (windowWidth < maxWidth) {
        if (isOnload) {
            store.commit('header/SET_SLIDERZOOM', true)
        }
        store.commit('header/SET_FIXEDZOOM', true)
    } else {
        store.commit('header/SET_FIXEDZOOM', false)
    }
}
