
import parseTime from '@/filters/parseTime.ts'
/**
 * 数组对象去重
 * @param arr 数组
 * @param prop 去重字段
 */
export function filterRepeat (arr: any, prop: string | number) {
    return arr.filter(function (element: any, index: any, self: any) {
        return self.findIndex((el: any) => el[prop] === element[prop]) === index
    })
}

/**
 * 防反跳。func函数在最后一次调用时刻的wait毫秒之后执行！
 * @param func 执行函数
 * @param wait 时间间隔
 * @param immediate 为true，debounce会在wait时间间隔的开始调用这个函数
 * @returns {Function}
 */
export const debounce = function (func: Function, wait: number, immediate: boolean) {
    var timeout: any, args: any, context: any, timestamp: any, result: any

    var later = function () {
        var last = new Date().getTime() - timestamp // timestamp会实时更新

        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
        }
    }

    return function () {
        args = arguments
        timestamp = new Date().getTime()
        var callNow = immediate && !timeout

        if (!timeout) {
            timeout = setTimeout(later, wait)
        }
        if (callNow) {
            result = func.apply(context, args)
            context = args = null
        }
        return result
    }
}

/**
 *
 * @param filterKeys
 * @param jsonData
 */
export const formatJson = (filterKeys: any, jsonData: any) => {
    return jsonData.map((data: any) => filterKeys.map((key: string) => {
        if (key === 'timestamp') { // 时间： timestamp
            return parseTime(data[key])
        } else {
            return data[key]
        }
    }))
}
