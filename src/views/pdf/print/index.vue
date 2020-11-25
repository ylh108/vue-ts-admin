<template>
    <div>
        <div class="button">
            <el-button type="primary" size="small" @click="handlePrint">浏览器打印</el-button>
        </div>
        <el-table :data="data.tableData" border fit highlight-current-row>
            <el-table-column v-for="(item,index) in data.tableColumns" :key="index" :label="item.label" :prop="item.prop" />
        </el-table>
        <div id="print" class="print">
            <el-table :data="data.tableData" border>
                <el-table-column v-for="(item,index) in data.tableColumns" :key="index" :label="item.label" :prop="item.prop" :width="item.width" />
            </el-table>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
@Component({
    components: {}
})
export default class Print extends Vue {
    private data: any = {
        tableData: [],
        tableColumns: [
            { label: '角色名称', prop: 'roleName', width: '200' },
            { label: '组织类型', prop: 'levelType', width: '100' },
            { label: '启用状态', prop: 'yn', width: '100' },
            { label: '说明', prop: 'remark', width: '' }
        ]
    }
    handlePrint () {
        ;(this as any).$elPrint('#print', 'element组件打印导出')
    }

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
                    if (item.yn === 0) {
                        item.yn = '禁用'
                    }
                    if (item.yn === 1) {
                        item.yn = '启用'
                    }
                })
                this.data.tableData = res.data
            }
        })
    }

    mounted () {
        this.getTableData()
    }
}
</script>

<style lang="stylus">
.el-print {
}

.print {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: #fff;
    z-index: -99;
    -webkit-print-color-adjust: exact;
    overflow: hidden;
}

.button {
    margin-bottom: 20px;
}
</style>
