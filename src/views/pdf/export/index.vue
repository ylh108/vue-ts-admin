<template>
    <div>
        <div class="button">
            <el-button type="primary" size="small" @click="handleDownload">jsPDF导出</el-button>
            <el-button type="primary" size="small" @click="handlePrint('#print', '浏览器打印')">浏览器打印</el-button>
        </div>
        <div id="demo">
            <div class="title"><img :src="require('@/assets/default.png')" alt="">pdf标题</div>
            <div>
                <p>展示区</p>
                <el-table :data="data.tableData" border class="table" ref="table">
                    <el-table-column v-for="(item,index) in data.tableColumns" :key="index" :label="item.label" :prop="item.prop" />
                </el-table>
            </div>
        </div>
        <div id="print" style="width: calc(100% - 10px);" :class="[data.windowPrint ? 'hide' : 'block']" :style="{'position': data.windowPrint ? 'relative': 'absolute'}">
            <div style="padding-bottom: 10px;">打印区</div>
            <table width="100%" border="1" cellspacing="0" cellpadding="0" style="font-size: 14px;border-color: #EBEEF5;">
                <tr>
                    <td style="padding: 10px;">角色名称</td>
                    <td style="padding: 10px;">角色编码</td>
                    <td style="padding: 10px;">启用状态</td>
                    <td style="padding: 10px;">说明</td>
                </tr>
                <tr v-for="(item,index) in data.tableData" :key="index">
                    <td style="padding: 10px;">{{item.roleName}}</td>
                    <td style="padding: 10px;">{{item.levelType}}</td>
                    <td style="padding: 10px;">{{item.yn}}</td>
                    <td style="padding: 10px;">{{item.remark}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import htmlToPdf from '@/utils/htmlToPdf'
@Component({
    components: {}
})
export default class Export extends Vue {
    private data: any = {
        tableData: [],
        windowPrint: false,
        tableColumns: [
            { label: '角色名称', prop: 'roleName' },
            { label: '组织类型', prop: 'levelType' },
            { label: '启用状态', prop: 'yn' },
            { label: '说明', prop: 'remark' }
        ]
    }

    handleDownload () {
        this.data.windowPrint = false
        htmlToPdf.downloadPDF(document.querySelector('#print'), 'pdf导出')
    }
    handlePrint (ele: any, fileName: any) {
        this.data.windowPrint = true
        ;(this as any).$print(ele, fileName, this)
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

<style lang="stylus" scoped>
.table {
    position: relative;
}

.button {
    margin-bottom: 20px;
}

#print {
    top: -1000px;
}

#demo {
    border: 1px solid #d8dce5;

    .title {
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        border-bottom: 1px solid #d8dce5;
        padding: 15px 0;

        img {
            width: 20px;
            vertical-align: middle;
        }
    }

    .content {
        padding: 30px;

        .table {
            position: static;
        }
    }
}
</style>
