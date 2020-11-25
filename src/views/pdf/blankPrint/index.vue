<template>
    <div class="el-print">
        <div class="button">
            <el-button type="primary" size="small" @click="handlePrint">浏览器打印</el-button>
        </div>
        <div>
            <el-table :data="data.tableData" border>
                <el-table-column v-for="(item, index) in data.tableColumns" :key="index" :label="item.label" :prop="item.prop" />
            </el-table>
        </div>
        <div id="print">
            <div class="print">
                <div class="print-title">打印区</div>
                <table width="100%" border="1" cellspacing="0" cellpadding="0" style="font-size: 14px;border-color: #EBEEF5;">
                    <tr>
                        <td style="padding: 10px;">角色名称</td>
                        <td style="padding: 10px;">角色编码</td>
                        <td style="padding: 10px;">启用状态</td>
                        <td style="padding: 10px;">说明</td>
                    </tr>
                    <tr v-for="(item, index) in data.tableData" :key="index">
                        <td style="padding: 10px;">{{ item.roleName }}</td>
                        <td style="padding: 10px;">{{ item.levelType }}</td>
                        <td style="padding: 10px;">{{ item.yn }}</td>
                        <td style="padding: 10px;">{{ item.remark }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
    components: {}
})
export default class BlankPrint extends Vue {
    private data: any = {
        tableData: [],
        tableColumns: [
            {
                label: '角色名称',
                prop: 'roleName'
            },
            {
                label: '组织类型',
                prop: 'levelType'
            },
            {
                label: '启用状态',
                prop: 'yn'
            },
            {
                label: '说明',
                prop: 'remark'
            }
        ]
    }
    handlePrint () {
        const html = (document.getElementById('print') as any).innerHTML
        const printContent = {
            fileName: '新窗口打印',
            html,
            style: this.getStyle()
        }
        sessionStorage.setItem('printContent', JSON.stringify(printContent))
        window.open('/print', '_blank')
    }

    getStyle () {
        var str = ''
        var styles = document.querySelectorAll('style,link')
        for (var i = 0; i < styles.length; i++) {
            str += styles[i].outerHTML
        }
        return str
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
#print {
    padding: 20px;
    display: none;
}

.print-title {
    text-align: center;
    font-size: 18px;
    color: red;
    margin-top: 10px;
    margin-bottom: 10px;
}

.button {
    margin-bottom: 20px;
}
</style>
