<template>
    <div>
        <el-table border :data="tableData">
            <el-table-column width="40" class-name="radio-column">
                <template slot-scope="scope">
                    <el-radio v-model="radioChecked" :label="scope.$index" @change="handleChange(scope.row)" />
                </template>
            </el-table-column>
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column label="地址" prop="address">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.text" placeholder="请输入地址" />
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Radio extends Vue {
    tableData = [
        {
            id: 1,
            date: '2016-05-02',
            name: '王小虎',
            text: 0
        },
        {
            id: 2,
            date: '2016-05-04',
            name: '王小虎',
            text: 0
        },
        {
            id: 3,
            date: '2016-05-01',
            name: '王小虎',
            text: 0
        },
        {
            id: 4,
            date: '2016-05-03',
            name: '王小虎',
            text: 0
        }
    ]
    radioChecked = null

    handleChange (row: any) {
        this.tableData.forEach((item: any) => {
            if (item.id === row.id) {
                item.text = 1
            } else {
                item.text = 0
            }
        })
    }
}
</script>

<style lang="stylus">
.radio-column {
    .el-radio__label {
        display: none;
    }
}
</style>
