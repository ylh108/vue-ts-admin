import store from '@/store'
import { DirectiveOptions } from 'vue'

const directive: DirectiveOptions = {
    inserted (el, binding, vnode) {
        el.oncontextmenu = event => event.preventDefault()
        el.onmouseup = (event: any) => {
            if (event.button === 2) {
                let evt = { clientX: event.clientX, clientY: event.clientY, text: event.target.textContent }
                store.commit('tags/SET_CONTEXTTAG', { flag: true, event: evt })
            }
        }
        document.onmouseup = (event: any) => {
            if (event.button !== 2 || !event.target.className.includes('directives-tag')) {
                store.commit('tags/SET_CONTEXTTAG', { flag: false })
            }
        }
    }
}
export default directive
