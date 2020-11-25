const elPrint = (ele: any, fileName: string) => {
    let iframe: any = document.createElement('iframe')
    document.head.getElementsByTagName('title')[0].innerText = `${fileName}`
    document.body.appendChild(iframe)
    iframe.id = 'myIframe'
    iframe.setAttribute('style', 'position:absolute;width:0;height:0;top:-10px;left:-10px;')
    iframe.contentDocument.head.innerHTML = `<meta charset="utf-8">
    <title>${fileName}</title>
    <meta name="format-detection" content="telephone=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">`
    let content = getStyle() + (document.querySelector(ele) as any).outerHTML
    let doc = iframe.contentDocument || iframe.contentWindow.document
    doc.open()
    doc.write(content)
    doc.close()
    iframe.onload = () => {
        iframe.contentWindow.print()
        document.body.removeChild(iframe)
    }
}
function getStyle () {
    var str = ''
    var styles = document.querySelectorAll('style,link')
    for (var i = 0; i < styles.length; i++) {
        str += styles[i].outerHTML
    }
    return str
}

export {
    elPrint
}
