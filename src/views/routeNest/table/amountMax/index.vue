<template>
    <div>
        <div class="price">
            <div>总价不能超过：{{ totalPrice }}元</div>
            <div>当前总价：{{ currentTotalPrice }}元</div>
        </div>
        <el-table ref="multipleTable" border :data="tableData" @select="handleSelect" @select-all="handleSelectAll">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="label" label="菜名" width="180"></el-table-column>
            <el-table-column prop="price" label="单价（元）" width="180"></el-table-column>
            <el-table-column label="数量" prop="value">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.value" @input="focus(scope.row)" placeholder="请输入数量" />
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import parseNumber from '@/filters/parseNumber.ts'

@Component
export default class Checkbox extends Vue {
    rows: any = []
    totalPrice: number = 100
    currentTotalPrice: number = 0
    tableData: any = [
        {
            id: 1,
            price: 12,
            label: '青椒炒土豆',
            value: 0
        },
        {
            id: 2,
            price: 9,
            label: '番茄炒蛋',
            value: 0
        },
        {
            id: 3,
            price: 15,
            label: '牛拉面',
            value: 0
        },
        {
            id: 4,
            price: 23,
            label: '虾扯蛋',
            value: 0
        }
    ]

    handleSelect (rows: any, row: any) {
    }

    handleSelectAll (rows: any) {
    }

    focus (row: any) {
        const index = this.tableData.findIndex((item: any) => item.id === row.id)
        const value = typeof row.value === 'number' ? JSON.stringify(row.value) : row.value
        parseNumber(value, false, false, 'value', this.tableData[index]) // 只能输入数字
    }

    getTotalPrice (row?: any, beforeRows?: any, rows?: any) {

    }
}
</script>

<style lang="stylus" scoped>
.price {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-evenly;
}
</style>
