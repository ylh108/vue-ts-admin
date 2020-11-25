import axios from 'axios'
import config from '@/config/index.ts'

if (process.env.NODE_ENV === 'development') { // 开发环境
    axios.defaults.baseURL = config.DEVELOPMENT
} else if (process.env.NODE_ENV === 'production') { // 生产环境
    axios.defaults.baseURL = config.PRODUCTION
}

const defaultOpt = {
    timeout: 60000,
    method: 'POST',
    responseType: 'json',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'app': 'wechat-app'
    }
}
// 请求拦截器
async function request (config: any, headers = {}) {
    const token = sessionStorage.getItem('token')
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.accessToken = token
    }
    const nConfig = Object.assign({}, defaultOpt, config, headers)
    return axios(nConfig)
}

// 响应拦截器
axios.interceptors.response.use(
    (response: any) => {
        return response
    },
    (error: any) => {
        return Promise.reject(error)
    }
)

export default request
