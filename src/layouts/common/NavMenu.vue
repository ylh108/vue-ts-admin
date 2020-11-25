<template>
    <div>
        <div v-for="(item,index) in navMenus" :key="index">
            <el-menu-item :index="item.path" v-if="!item.children">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.name }}</span>
            </el-menu-item>
            <el-submenu v-else :index="item.path">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span v-show="!isSliderZoom">{{ item.name }}</span>
                </template>
                <nav-menu v-if="item.children" :navMenus="item.children" />
            </el-submenu>
        </div>
    </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
    name: 'NavMenu',
    components: {}
})
export default class NavMenu extends Vue {
    @Prop() navMenus: any
    @Prop() isSliderZoom: any
}
</script>
<style lang="stylus" scoped>
.el-menu {

    .el-menu-item:focus, .el-menu-item:hover {
        background-color: #40a1bf80 !important;
    }

    .el-menu-item.is-active {
        background-color: #2286a5b3 !important;

        i {
            color: #ffe078;
        }
    }

    i {
        color: #fff;
    }

    .el-menu-item-group__title {
        padding: 0;
    }
}
</style>
