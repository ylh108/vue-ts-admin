<template>
    <div>
        <el-button size="small" type="primary" @click="handleDownload" style="margin-bottom:20px">导出</el-button>
        <el-table id="table" ref="multipleTable" :data="list" border fit highlight-current-row>
            <el-table-column label="Days" prop="Days" align="center"></el-table-column>
            <el-table-column label="EndDate" prop="EndDate" align="center"></el-table-column>
            <el-table-column label="IsPoint" prop="IsPoint" align="center"></el-table-column>
            <el-table-column label="OrderNum" prop="OrderNum" align="center"></el-table-column>
            <el-table-column label="PhaseName" prop="PhaseName" align="center"></el-table-column>
            <el-table-column label="PlanID" prop="PlanID" align="center"></el-table-column>
            <el-table-column label="Purpose" prop="Purpose" align="center"></el-table-column>
            <el-table-column label="SZPhaseName" prop="SZPhaseName" align="center"></el-table-column>
            <el-table-column label="SZSubIds" prop="SZSubIds" align="center"></el-table-column>
            <el-table-column label="SZSubName" prop="SZSubName" align="center"></el-table-column>
            <el-table-column label="SZZY" prop="SZZY" align="center"></el-table-column>
            <el-table-column label="SZZYCode" prop="SZZYCode" align="center"></el-table-column>
            <el-table-column label="StartDate" prop="StartDate" align="center"></el-table-column>
            <el-table-column label="Status" prop="Status" align="center"></el-table-column>
            <el-table-column label="SubIds" prop="SubIds" align="center"></el-table-column>
            <el-table-column label="SubName" prop="SubName" align="center"></el-table-column>
            <el-table-column label="TZZY" prop="TZZY" align="center"></el-table-column>
            <el-table-column label="TZZYCode" prop="TZZYCode" align="center"></el-table-column>
            <el-table-column label="TZ_Content" prop="TZ_Content" align="center"></el-table-column>
            <el-table-column label="TZ_Detail" prop="TZ_Detail" align="center"></el-table-column>
            <el-table-column label="TZ_Type" prop="TZ_Type" align="center"></el-table-column>
            <el-table-column label="T_ID" prop="T_ID" align="center"></el-table-column>
        </el-table>
    </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { formatJson } from '@/utils/index.ts'
import { exportJson2Excel, exportTable2Excel } from '@/utils/excel.ts'
@Component({
    components: {}
})
export default class Export extends Vue {
    private list: any = [
        {
            PlanID: 'fgfgfg',
            PhaseName: 'sdfsdf',
            SZPhaseName: 'wrege',
            SubIds: '',
            SubName: '',
            SZSubIds: '',
            SZSubName: '',
            TZZYCode: 'sdfsdf',
            IsPoint: '0',
            TZZY: 'dfdf',
            SZZYCode: 'ZXD',
            SZZY: 'hhth',
            Purpose: 'erert',
            TZ_Content: 'dfgdfg',
            TZ_Detail: '1.dfggfdg.sdf.asdg',
            Days: '',
            StartDate: '',
            EndDate: '',
            T_ID: '',
            Status: '0',
            OrderNum: 'fgfg',
            TZ_Type: 'nngn'
        },
        {
            PlanID: 'fgfgfg',
            PhaseName: 'sdfsdf',
            SZPhaseName: 'wrege',
            SubIds: '',
            SubName: '',
            SZSubIds: '',
            SZSubName: '',
            TZZYCode: 'sdfsdf',
            IsPoint: '0',
            TZZY: 'dfdf',
            SZZYCode: 'ZXD',
            SZZY: 'hhth',
            Purpose: 'erert',
            TZ_Content: 'dfgdfg',
            TZ_Detail: '1.dfggfdg.sdf.asdg',
            Days: '',
            StartDate: '',
            EndDate: '',
            T_ID: '',
            Status: '0',
            OrderNum: 'fgfg',
            TZ_Type: 'nngn'
        },
        {
            PlanID: 'fgfgfg',
            PhaseName: 'sdfsdf',
            SZPhaseName: 'wrege',
            SubIds: '',
            SubName: '',
            SZSubIds: '',
            SZSubName: '',
            TZZYCode: 'sdfsdf',
            IsPoint: '0',
            TZZY: 'dfdf',
            SZZYCode: 'ZXD',
            SZZY: 'hhth',
            Purpose: 'erert',
            TZ_Content: 'dfgdfg',
            TZ_Detail: '1.dfggfdg.sdf.asdg',
            Days: '',
            StartDate: '',
            EndDate: '',
            T_ID: '',
            Status: '0',
            OrderNum: 'fgfg',
            TZ_Type: 'nngn'
        }
    ]
    private handleDownload () {
        const tHeader = [
            'Days',
            'EndDate',
            'IsPoint',
            'OrderNum',
            'PhaseName',
            'PlanID',
            'Purpose',
            'SZPhaseName',
            'SZSubIds',
            'SZSubName',
            'SZZY',
            'SZZYCode',
            'StartDate',
            'Status',
            'SubIds',
            'SubName',
            'TZZY',
            'TZZYCode',
            'TZ_Content',
            'TZ_Detail',
            'TZ_Type',
            'T_ID'
        ]
        const filterVal: any = tHeader // 对应标题索引导出的val
        const list = this.list
        const data = formatJson(filterVal, list)
        exportJson2Excel(tHeader, data, 'sheet')
        // exportTable2Excel(tHeader, 'table')
    }
}
</script>
<style lang="stylus" scoped></style>
