<template>
    <div>
        <index :treeData="treeData" />
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import store from '@/store'
import index from './common/index.vue'

@Component({
    components: {
        index
    }
})
export default class Home extends Vue {
    get treeData () {
        let treeList = store.getters['sliderMenu/getTreeData']
        return treeList.filter((item: any) => item.path !== '/home')
    }
}
</script>
<style lang="stylus" scoped></style>
