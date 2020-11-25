<template>
    <div v-html="html"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
    components: {}
})
export default class Print extends Vue {
    html: any = null
    style: any = null
    fileName: string = ''

    getPrintContent () {
        let printContent = JSON.parse(
            (sessionStorage as any).getItem('printContent')
        )
        this.html = printContent.html
        this.style = printContent.style
        this.fileName = printContent.fileName
    }

    print () {
        if (document.querySelector('iframe')) {
            document.body.removeChild(document.querySelector('iframe') as any)
        }
        let iframe = document.createElement('iframe')
        iframe.setAttribute('id', 'iframe')
        document.head.getElementsByTagName('title')[0].innerText = `${this.fileName}`
        document.body.appendChild(iframe)
        let contentWindow: any = iframe.contentWindow || {}
        let doc = iframe.contentDocument || contentWindow.document
        doc.head.innerHTML = `
                <meta charset="utf-8">
                <title>${this.fileName}</title>
                <meta name="format-detection" content="telephone=no">
                <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
                <meta name="viewport" content="width=device-width,initial-scale=1.0">
            `
        let content = this.style + this.html
        doc.open()
        doc.write(content)
        doc.close()
        this.setIframeStyle()
        contentWindow.print()
        // window.close()
    }

    setIframeStyle () {
        let iframe: any = document.querySelector('iframe')
        iframe.style.border = 0
        iframe.style.width = 'calc(100% - 20px)'
        const obj: any = (document.getElementById('iframe') as any).contentWindow
        const body = obj.document.querySelector('body')
        const iframeHeight = obj.document.getElementsByClassName('print')[0].clientHeight + 20 + 'px'
        iframe.style.height = iframeHeight
        body.style.height = 'auto'
        iframe.style.marginLeft = '10px'
    }

    mounted () {
        document.body.removeChild(document.getElementById('app') as any)
        this.getPrintContent()
        this.print()
    }
}
</script>

<style lang="stylus" scoped></style>
