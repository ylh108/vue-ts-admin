<template>
    <div class="touch touch-content">
        <div ref="drag" class="drag touch-content" :style="{width: data.drag.isDrag ? 'calc(100% - 2px)' : 'auto','border-width': data.drag.isDrag ? '1px' : '0'}" @mousedown.prevent="onStart" @mousemove.prevent="onMove" @mouseup.prevent="onEnd">
            <div ref="dragContent" class="drag-content touch-content" :style="{left: data.drag.x + 'px',top: data.drag.y + 'px'}">拖我</div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
    components: {}
})
export default class Touch extends Vue {
    private data: any = {
        drag: {
            isDrag: false,
            startX: 0,
            startY: 0,
            x: 0,
            y: 0
        }
    }
    onStart (e: any) {
        this.data.drag.isDrag = true
        this.data.drag.startX = e.pageX - (this.$refs.dragContent as any).offsetLeft
        this.data.drag.startY = e.pageY - (this.$refs.dragContent as any).offsetTop
    }
    onMove (e: any) {
        if (!this.data.drag.isDrag) return
        this.data.drag.x = e.pageX - this.data.drag.startX
        this.data.drag.y = e.pageY - this.data.drag.startY
        // 边界处理
        let dragMaxWidth = (this.$refs.drag as any).clientWidth - (this.$refs.dragContent as any).offsetWidth
        let dragMaxHeight = (this.$refs.drag as any).clientHeight - (this.$refs.dragContent as any).offsetHeight
        if (this.data.drag.x < 0) {
            this.data.drag.x = 0
        } else if (this.data.drag.x > dragMaxWidth) {
            this.data.drag.x = dragMaxWidth
        }
        if (this.data.drag.y < 0) {
            this.data.drag.y = 0
        } else if (this.data.drag.y > dragMaxHeight) {
            this.data.drag.y = dragMaxHeight
        }
    }
    onEnd (e: any) {
        this.data.drag.isDrag = false
    }
    addEventMouseMove () {
        document.addEventListener('mousemove', (e:any) => {
            if (!e.target.className.includes('touch-content')) {
                // this.data.drag.isDrag = false
            }
        })
    }
    mounted () {
        this.addEventMouseMove()
    }
}
</script>
<style lang="stylus" scoped>
.touch {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .drag {
        position: absolute;
        border: 0px solid #d8dce5;
        width: auto;
        height: calc(100% - 2px);
        cursor: pointer;
        .drag-content {
            position: absolute;
            top: 0;
            left: 0;
            width: 50px;
            height: 30px;
            line-height: 30px;
            background-color: #2286a5;
            color: #fff;
            text-align: center;
            border-radius: 4px;
        }
    }
}
</style>
