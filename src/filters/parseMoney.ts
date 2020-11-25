const parseMoney = (value: any) => {
    if (value !== null && value !== '') {
        value = '' + value
        const k = value.indexOf('.')
        const strs = value.split('.')
        let result = ''
        while (strs[0].length > 3) {
            if (strs[0].slice(-4, -3) === '-') {
                break
            }
            result = ',' + strs[0].slice(-3) + result
            strs[0] = strs[0].slice(0, strs[0].length - 3)
        }
        if (k < 0) {
            return strs[0] + result + '.00'
        } else {
            if (value.length - k === 2) {
                return strs[0] + result + '.' + strs[1] + '0'
            } else {
                return (value = strs[0] + result + '.' + strs[1].substring(0, 2))
            }
        }
    } else {
        return '0.00'
    }
}
export default parseMoney
