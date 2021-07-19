<template>
    <div class="index">
        <div class="masked" @click="hideSilideMenu" v-show="isFixedZoom && !isSliderZoom"></div>
        <div class="slider-menu" :class="{'fixed-slider-menu': isFixedZoom && !isSliderZoom}" :style="{width: !isSliderZoom ? '256px': 'auto' }">
            <slider-menu />
        </div>
        <div class="container">
            <Header :sliderZoomRotate="isSliderZoom" />
            <Tags />
            <Content>
                <div class="transition" :style="{'overflow-y': (data.isOverFlow === true ? 'auto' : 'hidden')}">
                    <transition name="slide-right">
                        <router-view />
                    </transition>
                </div>
            </Content>
            <!-- <Footer /> -->
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import SliderMenu from '@/layouts/components/SliderMenu.vue'
import Header from '@/layouts/components/Header.vue'
import Tags from '@/layouts/components/Tags.vue'
import Content from '@/layouts/components/Content.vue'
import Footer from '@/layouts/components/Footer.vue'
import store from '@/store'
import { sliderZoom } from '@/layouts/common/media'

@Component({
    components: {
        SliderMenu,
        Header,
        Tags,
        Content,
        Footer
    }
})
export default class Index extends Vue {
    private data: any = {
        isOverFlow: false,
        hideSilideMenu: true
    }
    @Watch('$route')
    private handleRouteChange (to: any): void {
        this.isOverFlow()
    }
    isOverFlow () { // 初始化页面，隐藏滚动条
        this.data.isOverFlow = false
        setTimeout(() => {
            this.data.isOverFlow = true
        }, 500)
    }
    get isSliderZoom () {
        return store.getters['header/getIsSliderZoom']
    }
    get isFixedZoom () {
        return store.getters['header/getIsFixedZoom']
    }
    hideSilideMenu () {
        store.commit('header/SET_SLIDERZOOM', true)
    }
    mounted () {
        this.isOverFlow()
        window.addEventListener('resize', () => {
            sliderZoom(false)
        })
    }
}
</script>
<style lang="stylus" scoped>
.index {
    display: flex;
    position: absolute;
    left: 0;
    width: 100%;
    top: 0;
    height: 100%;
    background-color: #f0f2f5;
    overflow: hidden;
    min-width: 600px;

    .masked {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #0000004d;
        z-index: 98;
    }

    .slider-menu {
        position: relative;
        flex: 0 0 auto;

        &.fixed-slider-menu {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            z-index: 99;
        }
    }

    .container {
        flex: 1;

        .transition {
            position: absolute;
            overflow: hidden;
            left: 24px;
            right: 24px;
            top: 24px;
            bottom: 24px;
        }
    }
}
</style>
