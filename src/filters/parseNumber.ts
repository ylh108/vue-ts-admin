
/**
 *
 * @param value 要转换成整型的字符串
 * @param key el-form 绑定的key ,比如 'form.id','data.form.id'
 * @param that 当前this
 * @param isNegative 是否可以输入负号
 * @param isDecimal 是否可以输入小数点
 */
const parseNumber = (value: string, isNegative: boolean = true, isDecimal: boolean = true, key?: string, that?: any) => {
    let val = JSON.stringify(value).replace(/[^(\-)?\d\.]/g, '').replace('-', '$_$').replace('.', '$#$').replace(/\./g, '').replace(/\-/g, '').replace('$#$', '.').replace('$_$', '-')
    if (!isNegative) {
        val = val.replace(/\-/g, '')
    }
    if (!isDecimal) {
        val = val.replace(/\./g, '')
    }
    if (val.includes('-') && val.indexOf('-') !== 0) {
        val = val.replace(/\-/g, '')
    }
    if (val.includes('\.')) {
        let s = val.split('\.')
        if (s[1].length > 2) {
            val = `${s[0]}.${s[1].slice(0, 2)}`
        }
    }
    if (val.length > 1 && val.indexOf('0') === 0) {
        val = val.substring(1)
    }
    if (key) {
        const k = key.split('.')
        let p0 = key.split('.')[0]
        let p1 = key.split('.')[1]
        if (k.length === 1) {
            that[p0] = val
        } else if (k.length === 2) {
            that[p0][p1] = val
        } else if (k.length === 3) {
            let p2 = key.split('.')[2]
            that[p0][p1][p2] = val
        }
    }
    return val
}

export default parseNumber
