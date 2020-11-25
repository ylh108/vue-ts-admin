<template>
    <div class="menu">
        <div class="operation">
            <el-button type="primary" size="small" icon="el-icon-plus">添加</el-button>
            <el-button type="primary" size="small" icon="el-icon-edit">编辑</el-button>
            <el-button type="primary" size="small" icon="el-icon-delete">删除</el-button>
        </div>
        <div class="container">
            <div class="nav">
                <el-input class="input" placeholder="输入关键字进行过滤" v-model="data.filterText" />
                <el-tree class="tree" ref="tree" :filter-node-method="filterNode" :data="data.treeList" :props="data.defaultProps" @node-click="handleNodeClick" />
            </div>
            <el-form ref="form" label-width="80px" :model="data.form" :rules="data.rules" size="small" class="form">
                <el-form-item label="菜单编号" prop="id">
                    <el-input v-model="data.form.id" placeholder="请输入菜单编号"></el-input>
                </el-form-item>
                <el-form-item label="菜单名称" prop="name">
                    <el-input v-model="data.form.name" placeholder="请输入菜单名称"></el-input>
                </el-form-item>
                <el-form-item label="父级ID" prop="pid">
                    <el-input v-model="data.form.pid" disabled placeholder="请输入父级ID"></el-input>
                </el-form-item>
                <el-form-item label="链接" prop="link">
                    <el-input v-model="data.form.link" placeholder="请输入链接"></el-input>
                </el-form-item>
                <el-form-item label="图标" prop="pic">
                    <el-input v-model="data.form.pic" placeholder="请输入图表"></el-input>
                </el-form-item>
                <el-form-item label="排序值" prop="order">
                    <el-input v-model="data.form.order" placeholder="请输入排序值" @input="val => {parseNumber(val,false,false,'data.form.order',this)}"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select v-model="data.form.type" placeholder="请选择类型">
                        <el-option v-for="item in data.options" :key="item.value" :label="item.label" :value="item.value">
                            {{ item.label }}
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="平台" prop="checkList">
                    <el-checkbox-group v-model="data.form.checkList">
                        <el-checkbox label="APP"></el-checkbox>
                        <el-checkbox label="PC"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="说明" prop="remark">
                    <el-input v-model="data.form.remark" type="textarea" placeholder="请输入说明"></el-input>
                </el-form-item>
                <el-form-item class="submit">
                    <el-button type="primary" size="medium" @click="submit">保存</el-button>
                    <el-button type="primary" size="medium" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator'
import parseNumber from '@/filters/parseNumber.ts'
import store from '@/store'
@Component({
    components: {}
})
export default class Menu extends Vue {
    public data: any = {
        filterText: '',
        treeList: [],
        form: {
            id: 'xitongpeizhi',
            name: '菜单名称',
            pid: 'a108956271',
            link: '',
            pic: '',
            order: '',
            tppe: '',
            checkList: [],
            remark: ''
        },
        rules: {
            id: [
                { required: true, message: '请输入菜单编号', trigger: 'blur' }
            ],
            name: [
                { required: true, message: '请输入菜单名称', trigger: 'blur' }
            ],
            pid: [{ required: true, message: '请输入父级ID', trigger: 'blur' }],
            link: [{ required: true, message: '请输入链接', trigger: 'blur' }],
            type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
            checkList: [
                { required: true, message: '请选择平台', trigger: 'blur' }
            ]
        },
        defaultProps: {
            children: 'children',
            label: 'name'
        },
        options: [
            { label: '菜单', value: 'menu' },
            { label: '按钮', value: 'button' }
        ]
    }
    @Watch('data.filterText')
    filterTextChange (val: any) {
        ;(this.$refs.tree as any).filter(val.replace(' ', ''))
    }
    filterNode (value: any, data: any) {
        return data.name.indexOf(value) !== -1
    }
    submit () {
        ;(this.$refs.form as any).validate((valid: boolean) => {
            if (valid) {
                // submit
            }
        })
    }

    reset () {
        ;(this.$refs.form as any).resetFields()
    }

    handleNodeClick () {}

    getTreeList () {
        let treeData = store.getters['sliderMenu/getTreeData'].filter(
            (item: any) => item.name !== '首页'
        )
        this.data.treeList = treeData
    }
    parseNumber (val: string, isNegative: boolean, isDecimal: boolean, key: string, that: any) {
        parseNumber(val, false, false, key, that)
    }

    mounted () {
        this.getTreeList()
    }
}
</script>

<style lang="stylus" scoped></style>
<style lang="stylus">
.menu {
    .operation {
        margin-bottom: 20px;
    }

    .container {
        display: flex;

        .nav {
            border-radius: 4px;
            border: 1px solid #DCDFE6;

            .input {
                input {
                    border-bottom-left-radius: 0;
                    border-bottom-right-radius: 0;
                    border: 0;
                }
            }

            .tree {
                width: 300px;
                border: 0;
                border-top: 1px solid #d8dce5;
                padding: 10px;

                .el-tree-node__content:hover {
                    background-color: #f7f9fa;
                }

                .el-tree-node__label {
                    padding-left: 4px;
                }

                .el-icon-caret-right {
                    border: 1px solid #d8dce5;
                    border-radius: 50%;
                    padding: 1px;

                    &.is-leaf {
                        border: 0;
                    }
                }

                .el-icon-caret-right:before {
                    content: '\e6d9';
                }

                .expanded.el-icon-caret-right {
                    transform: rotate(0deg);

                    &:before {
                        content: '\e6d8';
                    }
                }
            }
        }

        .form {
            border: 1px solid #d8dce5;
            padding: 10px;
            margin-left: 24px;
            flex: 1;

            .submit {
                padding-top: 12px;
            }
        }
    }
}
</style>
