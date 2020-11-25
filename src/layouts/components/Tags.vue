<template>
    <div class="tags">
        <vue-scroll :ops="data.ops" ref="vs">
            <div class="tags-list">
                <router-link v-for="item in tags" :key="item.value" :to="{ path: item.value }">
                    <el-tag class="nav directives-tag" size="medium" @click="tagClick(item)" v-contextTag @close.prevent="closeTag(item)" :closable="item.value !== '/home'" :class="{ active: item.value === active }">{{ item.name }}</el-tag>
                </router-link>
            </div>
        </vue-scroll>
        <ul class="context-tag" :style="data.ctStyle" v-show="isContextTag">
            <li @click="refresh">刷新</li>
            <li @click="close" v-if="data.isShowContext">关闭</li>
            <li @click="closeOther">关闭其它</li>
            <li @click="closeAll" v-if="data.isShowContext">关闭所有</li>
        </ul>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import store from '@/store'
import router from '@/router'
import contextTag from '@/directives/contextTag'
import VueScroll from 'vuescroll'

@Component({
    components: {
        VueScroll
    },
    directives: {
        contextTag
    }
})
export default class Tabs extends Vue {
    @Ref() readonly vs: any
    private data = {
        ctStyle: {},
        isShowContext: true,
        ops: {
            vuescroll: {
                mode: 'slide',
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
                background: '#cecece',
                onlyShowBarOnScroll: false,
                size: '3px'
            },
            scrollPanel: {
                initialScrollY: 0,
                initialScrollX: 1,
                // 是否禁止x或y方向上的滚动
                scrollingY: false,
                scrollingX: true,
                easing: 'easeInQuad'
            }
        }
    }

    get active () {
        return store.getters['tags/getActive']
    }
    get tags () {
        this.vs && this.vs.refresh()
        return store.getters['tags/getTags']
    }
    get isContextTag () {
        let contextTag = store.getters['tags/getContextTag']
        let event = contextTag.event
        if (event && event.text === '首页') {
            this.data.isShowContext = false
        } else {
            this.data.isShowContext = true
        }
        if (contextTag.flag) {
            this.data.ctStyle = {
                left: event.clientX + 10 + 'px',
                top: event.clientY + 10 + 'px'
            }
        }
        return contextTag.flag
    }

    tagClick (item: any) {
        store.commit('header/SET_NAVIGATION', item.navigation)
        store.commit('tags/SET_ACTIVE', item.value)
    }
    closeTag (item: any) {
        item.close = true
        store.commit('tags/SET_TAGS', item)
        router.push(store.getters['tags/getActive'])
    }

    refresh (event: any) {
        let tags = store.getters['tags/getTags']
        let contextTag = store.getters['tags/getContextTag']
        let text = contextTag.event.text
        for (let item of tags) {
            if (item.name === text) {
                store.commit('header/SET_NAVIGATION', item.navigation)
                store.commit('tags/SET_ACTIVE', item.value)
                router.push(item.value)
                router.go(0)
                break
            }
        }
    }
    close (event: any) {
        let tags = store.getters['tags/getTags']
        let contextTag = store.getters['tags/getContextTag']
        let text = contextTag.event.text
        let item = tags.filter((item: any) => {
            if (item.name === text) {
                item.close = true
                return item
            }
        })
        store.commit('tags/SET_TAGS', item[0])
        router.push(store.getters['tags/getActive'])
    }
    closeOther (event: any) {
        let tags = store.getters['tags/getTags']
        let contextTag = store.getters['tags/getContextTag']
        let name = contextTag.event.text
        let item = tags.filter((item: any) => {
            if (item.name !== name && item.value !== '/home') {
                return item
            }
        })
        store.commit('tags/SET_TAGS', {
            closeOther: true,
            name,
            children: item
        })
        router.push(store.getters['tags/getActive'])
    }
    closeAll () {
        store.commit('tags/SET_TAGS', {
            closeAll: true
        })
        router.push(store.getters['tags/getActive'])
    }
}
</script>
<style lang="stylus">
.tags {
    padding: 5px 24px 5px;
    background: #ffffff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

    .tags-list {
        width: 0;
        display: inline-flex;

        a {
            text-decoration: none;
            margin-right: 5px;

            .nav {
                align-items: center;

                &.el-tag {
                    margin-right: 5px;
                    color: #495060;
                    background: #ffffff;
                    border: 1px solid #d8dce5;
                    cursor: pointer;

                    &:nth-last-child(1) {
                        margin-right: 0;
                    }

                    &.active {
                        background-color: #2286a5;
                        color: #fff;
                        border-color: #2286a5;

                        .el-icon-close {
                            color: #fff;
                        }
                    }

                    .el-icon-close {
                        color: #495060;

                        &:hover {
                            color: #ffffff;
                            background-color: #2286a5;
                        }
                    }
                }
            }
        }
    }

    .context-tag {
        position: absolute;
        background-color: #ffffff;
        padding: 5px 0;
        margin: 0;
        border-radius: 4px;
        list-style: none;
        box-shadow: 0px 1px 10px 0 #0000004d;
        z-index: 1;

        li {
            font-size: 12px;
            padding: 5px 19px;
            cursor: pointer;

            &:hover {
                background: #eee;
            }
        }
    }
}
</style>
