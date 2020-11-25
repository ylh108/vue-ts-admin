<template>
    <div class="role">
        <div class="search">
            <div>
                <span>角色名称</span>
                <el-input size="small" v-model="data.roleName" placeholder="请输入角色名称" />
            </div>
            <el-button type="small">查询</el-button>
        </div>
        <div ref="table">
            <el-table :isReload="data.isReload" class="table" :data="data.tableData" border :max-height="data.maxHeight">
                <el-table-column v-for="(item,index) in data.tableColumns" :key="index" :label="item.label" :prop="item.prop" :fixed="item.fixed" :width="item.width">
                    <template slot-scope="scope">
                        <div class="operation" v-if="item.prop === 'operation'">
                            <el-button size="mini" type="primary" @click="handleRoleEdit(scope.row)">编辑</el-button>
                            <el-button size="mini" type="primary" @click="handleYnEdit(scope.row)">
                                {{scope.row.yn === 0 ? '停用' : '启用'}}
                            </el-button>
                            <el-button size="mini" type="primary" @click="handleAuthorityEdit(scope.row)">权限分配</el-button>
                        </div>
                        <div v-else>
                            {{scope.row[scope.column.property]}}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="pagination" v-if="data.total > 0" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.currentPage" :total="data.total" :page-sizes="[10, 20, 30, 40]" :page-size="data.pageSize" layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>
        <role-dialog @submit="handleRoleDialogSubmit" ref="roleDialog" />
        <authority-dialog @submit="handleAuthorityDialogSubmit" ref="authorityDialog" />
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import RoleDialog from './RoleDialog.vue'
import AuthorityDialog from './AuthorityDialog.vue'
@Component({
    components: {
        RoleDialog,
        AuthorityDialog
    }
})
export default class Role extends Vue {
    private data: any = {
        isReload: false,
        tableData: [],
        tableColumns: [
            { label: '角色名称', prop: 'roleName' },
            { label: '角色编码', prop: 'roleCode' },
            { label: '角色类型', prop: 'roleType' },
            { label: '组织等级类型', prop: 'levelType' },
            { label: '启用状态', prop: 'yn' },
            { label: '说明', prop: 'remark' },
            { label: '操作', prop: 'operation', fixed: 'right', width: 228 }
        ],
        maxHeight: null,
        currentPage: 1,
        pageSize: 10,
        total: 0,
        isRole: false,
        isAuthority: false
    }
    handleSizeChange (val: number) {
        this.data.pageSize = val
    }
    handleCurrentChange (val: number) {
        this.data.currentPage = val
    }
    handleRoleEdit (row: any) {
        ;(this.$refs.roleDialog as any).show('edit', row)
    }
    handleYnEdit (row: any) {
        let status = row.yn === 0 ? '启用' : '停用'
        this.$confirm(`确定${status}`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            row.yn = row.yn === 0 ? 1 : 0
            this.$message({
                type: 'success',
                message: `${status}成功`
            })
        })
    }
    handleAuthorityEdit (row: any) {
        ;(this.$refs.authorityDialog as any).show('edit', row)
    }
    handleRoleDialogSubmit (val: any) {}
    handleAuthorityDialogSubmit (val: any) {}
    getTableData () {
        ;(this as any).$axios.post('/getRoleData').then((res: any) => {
            if (res.status === 200) {
                res.data.forEach((item: any) => {
                    if (item.orgLevelType === 'GROUP') {
                        item.levelType = '集团'
                    }
                    if (item.orgLevelType === 'AREA') {
                        item.levelType = '子集团'
                    }
                    if (item.orgLevelType === 'CITYCOMPANY') {
                        item.levelType = '城市公司'
                    }
                    if (item.orgLevelType === 'PROCOMPANY') {
                        item.levelType = '项目公司'
                    }
                })
                this.data.tableData = res.data
                this.data.total = res.data.length
            }
        })
    }
    setMaxHeight () {
        // 延迟加载，避免加载过快高度不对
        setTimeout(() => {
            if (this.$refs && this.$refs.table) {
                const roleEl = this.$refs.table as HTMLInputElement
                this.data.maxHeight =
                    window.innerHeight -
                    roleEl.getBoundingClientRect().top -
                    24 -
                    50
                this.reloadTable()
            }
        }, 300)
    }
    reloadTable () {
        this.data.isReload = false
        this.$nextTick(() => {
            this.data.isReload = true
        })
    }
    mounted () {
        this.setMaxHeight()
        this.getTableData()
        window.addEventListener('resize', () => {
            this.setMaxHeight()
        })
    }
}
</script>

<style lang="stylus" scoped>
.role {
    .search {
        display: flex;
        align-items: baseline;
        margin-bottom: 20px;

        div {
            margin-right: 20px;

            span {
                margin-right: 10px;
            }

            .el-input {
                width: auto;
            }
        }
    }

    .table {
        max-height: 48px;

        .operation {
            display: flex;
        }
    }

    .pagination {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
    }
}
</style>
