<template>
    <div>
        <div class="excel-upload">
            <input ref="excel-upload-input" @change="handleUpload" class="excel-upload-input" type="file" accept=".xlsx, .xls">
            <el-button @click="uploadFile" :loading="data.loading" class="excel-upload-button" size="small" type="primary">导入</el-button>
        </div>
        <el-table :data="data.tableData" border fit highlight-current-row>
            <el-table-column v-for="item of data.tableHeader" :key="item" :prop="item" :label="item" />
        </el-table>
    </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import XLSX from 'xlsx'
@Component({
    components: {}
})
export default class Upload extends Vue {
    private data: any = {
        loading: false,
        tableData: [],
        tableHeader: []
    }
    private uploadFile () {
        (this.$refs['excel-upload-input'] as HTMLInputElement).click()
    }
    private handleUpload (event: MouseEvent) {
        const files = (event.target as HTMLInputElement).files
        if (files) {
            this.data.loading = true
            const rawFile = files[0]
            const reader = new FileReader()
            reader.onload = e => {
                const data = (e.target as FileReader).result
                const workbook = XLSX.read(data, { type: 'array' })
                const firstSheetName = workbook.SheetNames[0]
                const worksheet = workbook.Sheets[firstSheetName]
                const header = this.getHeaderRow(worksheet)
                const results = XLSX.utils.sheet_to_json(worksheet)
                this.generateData(header, results)
                this.data.loading = false
            }
            reader.readAsArrayBuffer(rawFile)
        }
    }
    private getHeaderRow (sheet: { [key: string]: any }) {
        const headers: string[] = []
        const range = XLSX.utils.decode_range(sheet['!ref'])
        const R = range.s.r
        // start in the first row
        for (let C = range.s.c; C <= range.e.c; ++C) {
            // walk every column in the range
            const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
            // find the cell in the first row
            let hdr: string = ''
            if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
            if (hdr === '') {
                hdr = 'UNKNOWN ' + C // replace with your desired default
            }
            headers.push(hdr)
        }
        return headers
    }
    private generateData (header: any, results: any) {
        this.data.tableHeader = header
        this.data.tableData = results
    }
}
</script>
<style lang="stylus" scoped>
.excel-upload {
    position: relative;
    margin-bottom: 20px;

    .excel-upload-input {
        display: none;
    }
}
</style>
