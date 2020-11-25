<template>
    <div class="role-dialog">
        <el-dialog title="编辑角色" top="10vh" custom-class="dialog-border" append-to-body :close-on-click-modal="false" :close-on-press-escape="false" width="500px" @close="handleDialogClose" :visible.sync="data.dialogVisible">
            <el-form :model="data.ruleForm" :rules="data.rules" ref="ruleForm" label-width="100px">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="data.ruleForm.roleName" placeholder="请输入角色名称"></el-input>
                </el-form-item>
                <el-form-item label="角色编码" prop="roleCode">
                    <el-input v-model="data.ruleForm.roleCode" placeholder="请输入角色编码"></el-input>
                </el-form-item>
                <el-form-item label="角色类型" prop="roleType">
                    <el-input v-model="data.ruleForm.roleType" placeholder="请输入角色类型"></el-input>
                </el-form-item>
                <el-form-item label="组织等级类型" prop="orgLevelType">
                    <el-select v-model="data.ruleForm.orgLevelType" placeholder="请选择组织等级类型">
                        <el-option :label="'集团'" :value="'GROUP'"></el-option>
                        <el-option :label="'子集团'" :value="'AREA'"></el-option>
                        <el-option :label="'城市公司'" :value="'CITYCOMPANY'"></el-option>
                        <el-option :label="'项目公司'" :value="'PROCOMPANYGROUP'"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排序值" prop="orderVal">
                    <el-input v-model="data.ruleForm.orderVal" placeholder="请输入排序值" @input="val => {parseNumber(val,false,false,'data.ruleForm.orderVal',this)}"></el-input>
                </el-form-item>
                <el-form-item label="启用状态" prop="yn">
                    <el-select v-model="data.ruleForm.yn" placeholder="请选择启用状态">
                        <el-option label="启用" :value="1"></el-option>
                        <el-option label="停用" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="说明" prop="remark">
                    <el-input :autosize="{ minRows: 2, maxRows: 4}" type="textarea" v-model="data.ruleForm.remark" placeholder="请输入说明"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="handleDialogClose">取消</el-button>
                <el-button type="primary" size="small" @click="handleDialogSubmit">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import parseNumber from '@/filters/parseNumber.ts'
@Component({
    components: {}
})
export default class RoleDialog extends Vue {
    private data: any = {
        dialogVisible: false,
        ruleForm: {
            // 角色编码
            roleCode: '',
            // 角色名称
            roleName: '',
            // 角色类型
            roleType: '',
            // 组织角色类型
            orgLevelType: '',
            // 排序值
            orderVal: '',
            // 启用状态
            yn: 1,
            // 说明
            remark: '',
            // 所属系统类型
            sysType: 'oms'
        },
        rules: {
            roleCode: [
                { required: true, message: '请输入角色编码', trigger: 'blur' }
            ],
            roleName: [
                { required: true, message: '请输入角色名称', trigger: 'blur' }
            ]
        }
    }
    show (type: string, row: any) {
        if (type === 'edit') {
            this.data.ruleForm = row
        }
        this.data.dialogVisible = true
    }
    handleDialogClose () {
        this.data.dialogVisible = false
        ;(this.$refs.ruleForm as any).resetFields()
    }
    handleDialogSubmit () {
        ;(this.$refs.ruleForm as any).validate((valid: boolean) => {
            if (valid) {
                this.handleDialogClose()
                this.$emit('submit')
            }
        })
    }
    parseNumber (val: string, isNegative: boolean, isDecimal: boolean, key: string, that: any) {
        parseNumber(val, false, false, key, that)
    }
}
</script>

<style lang="stylus" scoped></style>
