<template>
    <div>
        <div v-for="(item,index) in treeData" :key="index">
            <div v-if="!item.children || !item.children.length" class="nav" @click="goPage(item)">
                <div class="content">{{item.name}}</div>
            </div>
            <home v-else :treeData="item.children" />
        </div>
    </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import router from '@/router'
import store from '@/store'
@Component({
    name: 'home'
})
export default class Index extends Vue {
    @Prop() treeData: any
    goPage (eItem: any) {
        router.push(eItem.path)
        store.commit('tags/SET_ACTIVE', eItem.path)
        let navigationList = store.getters['header/getNavigationList']
        for (let item of navigationList) {
            if (item.value === eItem.path) {
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
}
</script>
<style lang="stylus" scoped>
.nav {
    float: left;
    text-align: center;
    width: 200px;
    height: 200px;
    line-height: 200px;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3), 0px 0px 20px rgba(0, 0, 0, 0.1) inset;
    cursor: pointer;
    margin: 12px;

    &:hover {
        transform: scale(1.1);
        background-color: #2286a5;
        color: #fff;
    }
}
</style>
