<template>
    <div class="header" id="header">
        <div class="main">
            <div class="content">
                <div>
                    <i class="el-icon-s-fold icon" :class="[sliderZoomRotate ? 'rotate-180' : 'rotate-0']" @click="sliderZoomClick"></i>
                </div>
                <div>
                    <lang-select class="set-language" size="mini" />
                    <i class="el-icon-info icon" @click="data.editionVisible = true" placeholder="版本信息"></i>
                    <i class="el-icon-user icon" v-popover:dropdown></i>
                    <span class="aline-bottom user">{{ userName }}</span>
                    <el-popover ref="dropdown" popper-class="dropdown" placement="bottom" trigger="hover">
                        <ul>
                            <li @click="loginOut">退出</li>
                        </ul>
                    </el-popover>
                </div>
            </div>
        </div>
        <div class="nav-text">
            <div class="nav-main">
                <div class="home">{{ $t('header.home') }}</div>
                <div class="navigationings" v-if="data.navigations.length && data.isChange">
                    <div class="navigation" :class="{ 'translate-a': index === 0, 'translate-b': index === 1 }" v-for="(item, index) in data.navigations" :key="index">
                        {{ item }}
                    </div>
                </div>
            </div>
        </div>
        <div class="masked clearfix">
            <span></span>
            <span></span>
        </div>
        <el-dialog width="416px" :visible.sync="data.editionVisible" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
            <div slot="title" class="dialog-header">
                <i class="el-icon-info icon" />版本信息
            </div>
            <div class="dialog-container">
                <p>打包日期：2019-11-6</p>
                <p>平台版本号：1.0.0</p>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" type="primary" @click="data.editionVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script lang="ts">
import router from '@/router'
import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator'
import LangSelect from '@/components/LangSelect/index.vue'
import store from '@/store'
import { sliderZoom } from '@/layouts/common/media'

@Component({
    components: {
        LangSelect
    }
})
export default class Header extends Vue {
    @Prop({ default: false, type: Boolean }) sliderZoomRotate!: boolean
    @Watch('$route')
    routeChange (to: any, from: any) {
        this.navigation()
    }

    private data: any = {
        editionVisible: false,
        isChange: false,
        navigations: [],
        homeSty: { bottom: 0 }
    }

    get userName () {
        return store.getters['login/getUserName']
    }

    navigation () {
        let headerNavigation = store.getters['header/getNavigation']
        if (headerNavigation && headerNavigation !== 'undefined') {
            this.data.navigations.unshift(headerNavigation)
            if (this.data.navigations.length > 2) {
                this.data.navigations = this.data.navigations.slice(0, 2)
            }
            if (this.data.navigations[0] === '/首页') {
                this.data.navigations[0] = ''
            } else {
                this.data.navigations[0] = this.data.navigations[0].replace(/\//g, ' / ')
            }
        } else {
            this.data.navigations = []
        }
        this.data.isChange = false
        this.$nextTick(() => {
            this.data.isChange = true
        })
    }

    mounted () {
        this.navigation()
        sliderZoom(true, 800)
    }

    sliderZoomClick () {
        let sliderZoomRotate: boolean = store.getters['header/getIsSliderZoom']
        store.commit('header/SET_SLIDERZOOM', !sliderZoomRotate)
    }

    loginOut () {
        let dropdown: any = this.$refs.dropdown
        dropdown.popperElm.style.display = 'none'
        router.push({ name: 'login' })
    }
}
</script>
<style lang="stylus" scoped>
.header {
    position: relative;
    height: 64px;
    padding: 0 24px;
    background-color: #2286a5;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    overflow: hidden;
    color: #fff;

    .main {
        position: absolute;
        width: calc(100% - 48px);
        top: 50%;
        transform: translateY(-50%);
        z-index: 2;

        .content {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;

            div {
                z-index: 2;

                .set-language {
                    width: 90px;
                    margin-right: 20px;
                }

                .user {
                    color: #fff;
                }

                .aline-bottom {
                    vertical-align: -webkit-baseline-middle;
                }
            }
        }
    }

    .rotate-0 {
        transform: rotate(0deg);
        transition-duration: 0.5s;
    }

    .rotate-180 {
        transform: rotate(180deg);
        transition-duration: 0.5s;
    }

    .masked {
        display: flex;
        justify-content: space-between;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;

        span {
            width: 100px;
            background-color: #2286a5;
            height: 100%;
            float: left;

            &:nth-last-child(1) {
                width: 215px;
                float: right;
            }
        }
    }

    .nav-text {
        position: absolute;
        width: calc(100% - 70px - 215px);
        margin-left: 70px;
        left: 0;
        top: 20px;

        .nav-main {
            display: inline-flex;
            vertical-align: middle;
            width: 100%;

            .home {
                background-color: #2286a5;
                z-index: 2;
            }

            .navigationings {
                position: relative;
                width: calc(100% - 70px);

                .navigation {
                    position: absolute;
                    left: 0;
                    top: 0;

                    &.translate-a {
                        animation: amt_a 0.5s ease-in-out;
                        animation-fill-mode: forwards;
                    }

                    &.translate-b {
                        animation: amt_b 0.5s ease-in-out;
                        animation-fill-mode: forwards;
                    }

                    @keyframes amt_a {
                        from {
                            opacity: 0;
                            transform: translateX(-200px);
                        }

                        to {
                            opacity: 1;
                            transform: translateX(6px);
                        }
                    }

                    @keyframes amt_b {
                        0% {
                            opacity: 1;
                            transform: translateX(6px);
                        }

                        100% {
                            opacity: 0;
                            transform: translateX(200px);
                        }
                    }
                }
            }
        }
    }

    .icon {
        font-size: x-large;
        color: #fff;
        cursor: pointer;
        vertical-align: sub;

        &.el-icon-s-fold {
            margin-right: 20px;
        }

        &.el-icon-info {
            font-size: 20px;
            vertical-align: sub;
        }

        &.el-icon-user {
            margin-left: 20px;
            margin-right: 5px;
        }
    }
}

.dialog-header {
    color: #2c3e50;

    .el-icon-info {
        color: #2286a5;
        vertical-align: top;
        font-size: 22px !important;
        margin-right: 15px;
    }
}

.dialog-container {
    margin-left: 37px;
}
</style>
<style lang="stylus">
.el-popover {
    min-width: auto;
}

#header {
    .el-dialog__body {
        padding: 0 20px;
    }
}

.dropdown {
    padding: 0;
    border: 0;

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;

        li {
            padding: 12px;
            cursor: pointer;

            &:hover {
                color: #ffffff;
                background-color: #2286a5;
            }
        }
    }
}
</style>
