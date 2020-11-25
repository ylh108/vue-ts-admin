<template>
    <div id="app">
        <transition name="fade">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive" :key="key"></router-view>
            </keep-alive>
        </transition>
        <transition name="fade">
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
    </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class App extends Vue {
    get key () {
        return this.$route.path
    }
}
</script>
<style lang="stylus">
html, #app, body {
    width: 100%;
    height: 100%;
}

body {
    margin: 0;
}

.hide {
    display: none;
}

.block {
    display: block;
}

#app {
    font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin: 0;
    padding: 0;
}

.slide-top-enter-active, .slide-top-leave-active, .slide-bottom-enter-active, .slide-bottom-leave-active, .slide-left-enter-active, .slide-left-leave-active, .slide-right-enter-active, .slide-right-leave-active {
    will-change: transform;
    transition: all 0s ease-in-out 0s;
    position: absolute;
    background-color: #ffffff;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

.slide-top-enter {
    transform: translateY(100%);
}

.slide-top-leave-active {
    transform: translateY(-100%);
    opacity: 0;
}

.slide-bottom-enter {
    transform: translateY(100%);
}

.slide-bottom-leave-active {
    transform: translateY(-100%);
    opacity: 0;
}

.slide-left-enter {
    transform: translateX(100%);
}

.slide-left-leave-active {
    transform: translateX(-100%);
    opacity: 0;
}

.slide-right-enter {
    transform: translateX(-100%);
}

.slide-right-leave-active {
    transform: translateX(100%);
    opacity: 0;
}

.clearfix {
    content: '';
    display: block;
    clear: both;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

button.el-button.is-disabled {
    color: #fff !important;
    border-color: #7ECEE8 !important;
    background-color: #7ECEE8 !important;

    &:hover, &:active {
        color: #fff !important;
        border-color: #7ECEE8 !important;
        background-color: #7ECEE8 !important;
    }
}

.el-table.el-table--fit {
    // position: absolute;
}

.el-button {
    color: #ffffff !important;
    background-color: #2286a5 !important;
    border-color: #2286a5 !important;
}

.dialog-border {
    .el-dialog__header {
        position: relative;
        padding: 10px 20px;
        border-bottom: 1px solid #dcdfe6;

        .el-dialog__headerbtn {
            top: 0;
            bottom: 0;
        }
    }

    .el-dialog__body {
        .el-form-item {
            &:nth-last-child(1) {
                margin-bottom: 0;
            }
        }
    }

    .el-dialog__footer {
        padding: 10px 20px;
        border-top: 1px solid #dcdfe6;
    }
}

// 兼容ie
.el-table__header {
    width: 100% !important;
}

.el-table__body {
    width: 100% !important;
}
.el-table__footer {
    width: 100% !important;
}
</style>
<style media="print">
@page {
    /*portrait： 纵向打印,  landscape: 横向*/
    /*size: A4 landscape;*/
}
@media print {
    table,
    tbody,
    thead {
        width: 100% !important;
        zoom: 0.99;
    }

    colgroup {
        position: absolute;
        width: 100% !important;
    }
}
</style>
