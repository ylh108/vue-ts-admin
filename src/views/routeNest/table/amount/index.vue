<template>
    <div>
        <el-table :data="tableData" border show-summary :summary-method="getSummaries" style="width: 100%">
            <el-table-column prop="id" label="ID" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="amount1" sortable label="数值 1">
                <template slot-scope="scope">
                    {{scope.row.amount1 | parseMoney}}
                </template>
            </el-table-column>
            <el-table-column prop="amount2" sortable label="数值 2">
                <template slot-scope="scope">
                    {{scope.row.amount2 | parseMoney}}
                </template>
            </el-table-column>
            <el-table-column prop="amount3" sortable label="数值 3">
                <template slot-scope="scope">
                    {{scope.row.amount3 | parseMoney}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import parseMoney from '@/filters/parseMoney'
@Component
export default class Amount extends Vue {
    tableData = [
        {
            id: '12987122',
            name: '王小虎1',
            amount1: '21238734',
            amount2: '-323473.2',
            amount3: 10
        },
        {
            id: '12987123',
            name: '王小虎2',
            amount1: '-165',
            amount2: '4.43',
            amount3: 12
        },
        {
            id: '12987124',
            name: '王小虎3',
            amount1: '324',
            amount2: '1.9',
            amount3: 9
        },
        {
            id: '12987125',
            name: '王小虎4',
            amount1: '621',
            amount2: '2.2',
            amount3: 17
        },
        {
            id: '12987126',
            name: '王小虎5',
            amount1: '53936',
            amount2: '6823',
            amount3: 15
        }
    ]
    getSummaries (param: any) {
        const { columns, data } = param
        const sums: any = []
        columns.forEach((column: any, index: any) => {
            if (index === 0) {
                sums[index] = '总价'
                return
            }
            const values = data.map((item: any) =>
                Number(item[column.property])
            )
            if (!values.every((value: any) => isNaN(value))) {
                sums[index] = values.reduce((prev: any, curr: any) => {
                    const value = Number(curr)
                    if (!isNaN(value)) {
                        return prev + curr
                    } else {
                        return prev
                    }
                }, 0)
                sums[index] = parseMoney(sums[index]) + ' 元'
            } else {
                // sums[index] = 'N/A';
                sums[index] = ''
            }
        })
        return sums
    }
}
</script>

<style lang="stylus" scoped></style>
