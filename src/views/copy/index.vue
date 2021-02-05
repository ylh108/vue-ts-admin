<template>
    <div @touchstart="gotouchstart" @touchmove="gotouchmove" @touchend="gotouchend">
        <ul>
            <li v-for="text in data" :key="text">{{text}}</li>
        </ul>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Copy extends Vue {
    private data = [
        '八戒不要以为你站在灯塔下就是夜明猪了',
        '不要站在你的角度看我我怕你看不懂',
        '男人苦点没关系别苦了跟你一辈子的女人',
        '你说你愿意和我白头到老，不行，我想黑发飘飘',
        '申请进入你的心里，我敲门了喔',
        '生活不能给你的甜，或许我可以'
    ];
    private timeOutEvent: any;
    copyAppSecret (text: string) {
        if (document.getElementsByClassName('copyInput').length) { // 删除上一个动态生成input
            document.getElementsByClassName('copyInput')[0].remove()
        }
        let createInput = document.createElement('input')
        createInput.className = 'copyInput'
        createInput.value = text
        document.body.appendChild(createInput)
        createInput.select() // 选择对象
        document.execCommand('Copy') // 执行浏览器复制命令
        createInput.style.display = 'none'
        this.$message({ message: '复制成功', type: 'success' })
    }
    gotouchstart (e: any) {
        clearTimeout(this.timeOutEvent) // 清除定时器
        this.timeOutEvent = 0
        this.timeOutEvent = setTimeout(() => {
            // 执行长按要执行的内容，
            // if (navigator.userAgent.indexOf('UBrowser') >= 0) { // 如果是uc浏览
            this.copyAppSecret(e.target.innerText)
            // }
        }, 600) // 这里设置定时
    }
    // 手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
    gotouchend () {
        clearTimeout(this.timeOutEvent)
        if (this.timeOutEvent !== 0) {
            // 这里写要执行的内容（尤如onclick事件）
        }
    }
    // 如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
    gotouchmove () {
        clearTimeout(this.timeOutEvent) // 清除定时器
        this.timeOutEvent = 0
    }
}
</script>

<style lang="stylus" scoped>
ul li {
    padding: 20px;
}
</style>
