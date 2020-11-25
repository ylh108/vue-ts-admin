<template>
    <div class="role-control-dialog">
        <el-dialog title="分配角色" top="10vh" custom-class="dialog-border" append-to-body :close-on-click-modal="false" :close-on-press-escape="false" width="600px" @close="handleDialogClose" :visible.sync="data.dialogVisible">
            <div>
                <el-checkbox :indeterminate="data.isIndeterminate" v-model="data.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <el-checkbox-group v-model="data.checkedList" @change="handleCheckChange">
                    <el-row>
                        <el-col :span="8" v-for="item in data.checkList" :key="item.id">
                            <el-checkbox :label="item.roleName">{{item.roleName}}</el-checkbox>
                        </el-col>
                    </el-row>
                </el-checkbox-group>
            </div>
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
export default class RoleControlDialog extends Vue {
    private data: any = {
        dialogVisible: false,
        isIndeterminate: false,
        checkAll: false,
        checkList: [],
        checkedList: []
    }

    handleCheckAllChange (val: any) {
        let checkedList: any = []
        if (val) {
            this.data.checkList.map((item: any) => {
                checkedList.push(item.roleName)
            })
        }
        this.data.checkedList = checkedList
        this.data.isIndeterminate = false
    }

    handleCheckChange (val: any) {
        let checkedCount = val.length
        this.data.checkAll = checkedCount === this.data.checkList.length
        this.data.isIndeterminate =
            checkedCount > 0 && checkedCount < this.data.checkList.length
    }

    show (type: string, id: string, row: any) {
        this.data.checkList = row
        this.data.dialogVisible = true
    }
    handleDialogClose () {
        this.data.dialogVisible = false
        this.data.checkList = []
        this.data.checkedList = []
    }
    handleDialogSubmit () {
        this.handleDialogClose()
        this.$emit('submit')
    }
}
</script>

<style lang="stylus" scoped></style>
