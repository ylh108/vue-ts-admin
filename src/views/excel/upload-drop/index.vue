<template>
    <div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
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
        ;(this.$refs['excel-upload-input'] as HTMLInputElement).click()
    }
    private handleUpload (event: MouseEvent, dropFile?:any) {
        let files = (event.target as HTMLInputElement).files
        if (dropFile) {
            files = dropFile
        }
        if (files) {
            const rawFile = files[0]
            if (files.length !== 1) {
                this.$message.error('Only support uploading one file!')
                return
            }
            if (!this.isExcel(rawFile)) {
                this.$message.error('Only supports upload .xlsx, .xls, .csv suffix files')
                return
            }
            this.data.loading = true

            const reader = new FileReader()
            reader.onload = (e) => {
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
    private isExcel (file: File) {
        return /\.(xlsx|xls|csv)$/.test(file.name)
    }
    handleDrop (e: DragEvent) {
        e.preventDefault()
        if (this.data.loading || !e.dataTransfer) return
        const files = e.dataTransfer.files
        this.handleUpload(e, files)
        // e.stopPropagation()
    }
    private handleDragover (e: DragEvent) {
        e.preventDefault()
        if (e.dataTransfer) {
            e.dataTransfer.dropEffect = 'copy'
        }
        // e.stopPropagation()
    }
}
</script>
<style lang="stylus" scoped>
.drop {
    position: absolute;
    top: 0;
    height: 100%;
}

.excel-upload {
    position: relative;
    margin-bottom: 20px;

    .excel-upload-input {
        display: none;
    }
}
</style>
