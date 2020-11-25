<template>
    <div>
        <div class="header">
            <div class="content" @click="goHome">
                <el-image class="logo" :src="require('@/assets/default.png')"></el-image>
                <span class="name" v-show="!isSliderZoom">{{ $t('login.title') }}</span>
            </div>
        </div>
        <div class="menu">
            <vue-scroll :ops="data.ops">
                <el-menu router :collapse-transition="false" :default-active="active" @select="handleSelect" :collapse="isSliderZoom" background-color="transparent" text-color="#fff" active-text-color="#ffe078">
                    <nav-menu :navMenus="treeData" :isSliderZoom="isSliderZoom" />
                </el-menu>
            </vue-scroll>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import store from '@/store'
import router from '@/router'
import VueScroll from 'vuescroll'
import NavMenu from '../common/NavMenu.vue'

@Component({
    components: {
        VueScroll,
        NavMenu
    }
})
export default class SliderMenu extends Vue {
    private data = {
        ops: {
            vuescroll: {
                scroller: {
                    locking: true,
                    /** 最小缩放级别 */
                    minZoom: 1,
                    /** 最大缩放级别 */
                    maxZoom: 1,
                    preventDefault: true,
                    preventDefaultOnMove: true
                }
            },
            bar: {
                background: '#2286a5b3',
                onlyShowBarOnScroll: false
            },
            scrollPanel: {
                initialScrollY: 1,
                initialScrollX: 0,
                // 是否禁止x或y方向上的滚动
                scrollingY: true,
                scrollingX: false,
                easing: 'easeInQuad'
            }
        }
    }
    get active () {
        return store.getters['tags/getActive']
    }
    get treeData () {
        let treeData = store.getters['sliderMenu/getTreeData'] && sessionStorage.getItem('treeData')
        if (!treeData) {
            router.push('/login')
            return []
        } else {
            return store.getters['sliderMenu/getTreeData']
        }
    }

    get isSliderZoom () {
        return store.getters['header/getIsSliderZoom']
    }

    handleSelect (index: string, path?: object, e?: any) {
        store.commit('tags/SET_ACTIVE', index)
        let navigationList = store.getters['header/getNavigationList']
        for (let item of navigationList) {
            if (item.value === index) {
                store.commit('header/SET_NAVIGATION', item.name)
                store.commit('tags/SET_TAGS', {
                    navigation: item.name,
                    name: item.name.slice(item.name.lastIndexOf('/') + 1),
                    value: item.value
                })
                break
            }
        }
    }

    goHome () {
        this.handleSelect('/home')
        router.push('/home')
    }
}
</script>

<style scoped lang="stylus">
.header {
    display: flex;
    color: #fff;
    height: 64px;
    background-color: #2286a5;
    padding: 0 20px;
    z-index: 1;

    .content {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        .logo {
            width: 32px;
        }

        .name {
            font-weight: 600;
            font-size: 18px;
            padding-left: 10px;
        }
    }
}

.menu {
    position: absolute;
    top: 64px;
    bottom: 0;
    left: 0;
    width: 100%;
    background: url('~@/assets/slider.png');
    background-size: 100% 100%;

    .el-menu {
        width: 100%;
        border-right: 0;
    }
}
</style>
<style lang="stylus">
.logo {
    img {
        vertical-align: middle;
        top: 0;
        left: 0;
        transform: none;
    }
}

.menu {
    .el-submenu__title:hover {
        background-color: transparent !important;
    }

    .el-submenu__icon-arrow {
        color: #ffffff;
    }
}

.el-menu--vertical {
    background: url('~@/assets/slider.png');
    background-size: 100% 100%;

    .el-menu--popup-right-start {
        padding: 0;
        margin: 0;
    }

    .el-submenu__title {
        background-color: transparent !important;
    }

    .el-menu--vertical {
        top: 0 !important;
    }

    .el-menu-item.is-active {
        background-color: #2286a580 !important;
    }

    .el-menu-item:focus, .el-menu-item:hover {
        background-color: #40a1bf80 !important;
    }
}

.el-icon-arrow-right:before {
    content: '';
}
</style>
