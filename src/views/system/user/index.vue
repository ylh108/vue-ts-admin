<template>
    <div class="user">
        <div class="search">
            <div>
                <span>姓名</span>
                <el-input size="small" v-model="data.name" placeholder="请输入姓名" />
            </div>
            <div>
                <span>登录账号</span>
                <el-input size="small" v-model="data.code" placeholder="请输入登录账号" />
            </div>
            <el-button type="small">查询</el-button>
        </div>
        <div ref="table">
            <el-table :isReload="data.isReload" class="table" :data="data.tableData" border :max-height="data.maxHeight">
                <el-table-column v-for="(item,index) in data.tableColumns" :key="index" :label="item.label" :prop="item.prop" :fixed="item.fixed" :width="item.width">
                    <template slot-scope="scope">
                        <div class="operation" v-if="item.prop === 'operation'">
                            <el-button size="mini" type="primary" @click="handleAuthorityEdit(scope.row)">分配角色</el-button>
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
        <role-control-dialog @submit="handleRoleControlDialog" ref="roleControlDialog" />
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import RoleControlDialog from './RoleControlDialog.vue'
@Component({
    components: {
        RoleControlDialog
    }
})
export default class User extends Vue {
    private data: any = {
        isReload: false,
        tableData: [],
        tableColumns: [
            { label: '员工号', prop: 'siteno' },
            { label: '登录账号', prop: 'code' },
            { label: '姓名', prop: 'name' },
            { label: '用户类型', prop: 'pkUsertype' },
            { label: '职位', prop: 'postname' },
            { label: '民族', prop: 'national' },
            { label: '地址', prop: 'belongToRegion' },
            { label: '操作', prop: 'operation', fixed: 'right', width: 100 }
        ],
        maxHeight: null,
        currentPage: 1,
        pageSize: 10,
        total: 0
    }
    getTableData () {
        ;(this as any).$axios.post('/getUserData').then((res: any) => {
            if (res.status === 200) {
                this.data.tableData = res.data
                this.data.total = res.data.length
            }
        })
    }
    setMaxHeight () {
        // 延迟加载，避免加载过快高度不对
        setTimeout(() => {
            if (this.$refs && this.$refs.table) {
                const userEl = this.$refs.table as HTMLInputElement
                this.data.maxHeight = window.innerHeight - userEl.getBoundingClientRect().top - 24 - 50
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
    handleAuthorityEdit (row: any) {
        ;(this as any).$axios.post('/getRoleControlData').then((res: any) => {
            if (res.status === 200) {
                ;(this.$refs.roleControlDialog as any).show(
                    'edit',
                    row.id,
                    res.data
                )
            }
        })
    }
    handleRoleControlDialog (val: any) {}
    handleSizeChange (val: number) {
        this.data.pageSize = val
    }
    handleCurrentChange (val: number) {
        this.data.currentPage = val
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
.user {
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
