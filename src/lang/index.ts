import Vue from 'vue'
import VueI18n from 'vue-i18n'
// element-ui built-in lang
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)

const messages = {
    en: {
        ...enLocale,
        ...elementEnLocale
    },
    zh: {
        ...zhLocale,
        ...elementZhLocale
    }
}

const languageKey = 'lang'
export const getLanguage = () => sessionStorage.getItem(languageKey)
export const setLanguage = (language: string) => sessionStorage.setItem(languageKey, language)

export const getLocale = () => {
    const sessionLanguage = getLanguage()
    if (sessionLanguage) {
        return sessionLanguage
    }

    const language = navigator.language.toLowerCase()
    const locales = Object.keys(messages)
    for (const locale of locales) {
        if (language.indexOf(locale) > -1) {
            return locale
        }
    }

    // 默认显示中文
    return 'zh'
}

const i18n = new VueI18n({
    locale: getLocale(),
    messages
})

export default i18n
