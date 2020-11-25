<template>
    <div class="role-dialog">
        <el-dialog title="权限控制" top="10vh" custom-class="dialog-border" append-to-body :close-on-click-modal="false" :close-on-press-escape="false" width="500px" @close="handleDialogClose" :visible.sync="data.dialogVisible">
            <el-tree ref="tree" :data="data.treeList" :props="data.defaultProps" show-checkbox node-key="path" @node-click="handleNodeClick"></el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="handleDialogClose">取消</el-button>
                <el-button type="primary" size="small" @click="handleDialogSubmit">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
@Component({
    components: {}
})
export default class AuthorityDialog extends Vue {
    private data: any = {
        dialogVisible: false,
        treeList: [],
        defaultProps: {
            children: 'children',
            label: 'name'
        }
    }
    handleNodeClick () {}
    loadNode () {
        const treeData = this.$store.getters['sliderMenu/getTreeData'].filter((item: any) => item.name !== '首页')
        this.data.treeList = treeData
    }
    show (type: string, row: any) {
        this.data.dialogVisible = true
        this.$nextTick(() => {
            this.loadNode()
        })
    }
    handleDialogClose () {
        ;(this.$refs.tree as any).setCheckedKeys([])
        this.data.dialogVisible = false
    }
    handleDialogSubmit () {
        this.handleDialogClose()
        this.$emit('submit')
    }
}
</script>

<style lang="stylus" scoped></style>
