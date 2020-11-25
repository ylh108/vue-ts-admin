<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px" class="form">
            <el-form-item label="图片">
                <div class="pictures" v-if="pictures.length">
                    <div class="pic" v-for="(item,index) in pictures" :key="index" @mouseenter="picEnter(index)" @mouseleave="picLeave">
                        <div class="opera" v-show="showIndex === index">
                            <span @click="previewCurrentPic(index,item.value)">预览</span>
                            <span @click="deleteCurrentPic(index)">删除</span>
                        </div>
                        <div class="img">
                            <img :src="item.value" alt="" />
                        </div>
                        <div class="name">{{item.name}}</div>
                    </div>
                </div>
                <div class="operation">
                    <input ref="file" style="display: none;" type="file" enctype="multipart/form-data" accept="image/*" @change="imageChange" />
                    <el-button :disabled="isPreview" type="primary" size="small" @click="uploadFile" :loading="imgsLoading">添加图片</el-button>
                    <el-button :disabled="isPreview" type="primary" size="small" @click="uploading">开始上传</el-button>
                </div>
            </el-form-item>
        </el-form>
        <div class="preview" v-show="isPreview">
            <div class="preview-content">
                <div class="preview-masked"></div>
                <div class="preview-close" @click="previewClose">×</div>
                <div class="preview-img">
                    <span class="center prev" @click="prev" v-show="this.currentIndex > 0">上一张</span>
                    <img class="center" :src="previewImg" alt="" />
                    <span class="center next" @click="next" v-show="this.currentIndex < pictures.length - 1">下一张</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
@Component({
    components: {}
})
export default class UploadImage extends Vue {
    form = {}
    imgsLoading = false
    pictures: any = []
    showIndex: any = ''
    currentIndex: any = ''
    isPreview: boolean = false
    previewImg: string = ''

    uploadFile () {
        ;(this.$refs['file'] as HTMLInputElement).click()
    }
    imageChange (event: MouseEvent) {
        const target: any = event.target
        const files: any = target.files
        const name: string = target.value.substring(
            target.value.lastIndexOf('\\') + 1
        )
        // const bol = this.pictures.some((item: any) => item.name === name)
        // if (bol) { // 名称相同不能重复添加
        //     this.$message({
        //         type: 'warning',
        //         message: '图片已存在，不能重复添加'
        //     })
        //     return
        // }
        if (files) {
            let reader = new FileReader()
            reader.readAsDataURL(files[0])
            reader.onload = () => {
                this.pictures.push({ name: name, value: reader.result })
                target.value = '' // 清除value可重复上传同一名称的图片
            }
        }
    }
    prev () {
        this.currentIndex -= 1
        this.previewImg = this.pictures[this.currentIndex].value
    }
    next () {
        this.currentIndex += 1
        this.previewImg = this.pictures[this.currentIndex].value
    }
    picEnter (index: number) {
        if (this.isPreview) return
        this.currentIndex = index
        this.showIndex = index
    }
    picLeave () {
        this.showIndex = ''
    }
    previewCurrentPic (index: number, src: string) {
        this.isPreview = true
        this.previewImg = src
        this.showIndex = ''
    }
    previewClose () {
        this.isPreview = false
        this.previewImg = ''
    }
    deleteCurrentPic (index: number) {
        let that = this
        this.$confirm('确定删除该图片？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            that.pictures.splice(index, 1)
            this.$message({
                type: 'success',
                message: '删除成功'
            })
        })
    }
    // base64图片转二进制
    convertBase64ToBlob (src: string) {
        let arr: any = src.split(',')
        let mime = arr[0].match(/:(.*?);/)[1]
        let bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        return new Blob([u8arr], { type: mime })
    }
    uploading () {
        if (!this.pictures.length) {
            this.$message({
                type: 'warning',
                message: '至少添加一张图片上传'
            })
            return
        }
        // this.imgsLoading = true
        // 创建form对象
        debugger
        let params = new FormData()
        for (let i = 0; i < this.pictures.length; i++) {
            params.append(
                'files',
                this.convertBase64ToBlob(this.pictures[i].value)
            )
        }
        // 添加请求头
        let config = {
            headers: { 'Content-Type': 'multipart/form-data;charset=utf-8' }
        }
        // ;(this as any).$axios.post('url',params,config).then((res:any) => {
        //     this.imgsLoading = false
        //     // doSomeThing
        // })
    }
}
</script>

<style lang="stylus" scoped>
.preview {
    position: fixed;
    top: calc(50% - 200px);
    left: calc(50% - 200px);
    width: 400px;
    height: 400px;
    overflow: hidden;
    z-index: 999;

    .preview-content {
        position: relative;
        width: 100%;
        height: 100%;

        .preview-masked {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
            background-color: #0006;
        }

        .preview-img {
            position: relative;
            width: 100%;
            height: 100%;
            z-index: 3;

            .center {
                position: absolute;
                max-width: 100%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: #fff;
            }

            .prev {
                cursor: pointer;
                left: 36px;
                // top: auto;
                // bottom: 0;
                z-index: 1;
            }

            .next {
                cursor: pointer;
                left: auto;
                right: -12px;
                // top: auto;
                // bottom: 0;
                z-index: 1;
            }
        }

        .preview-close {
            position: absolute;
            right: 0;
            top: 0;
            font-size: 18px;
            background-color: #fff;
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            z-index: 4;
            cursor: pointer;
        }
    }
}

.form {
    margin-top: 20px;
    border: 1px solid #eee;
    padding: 20px 0;

    .pictures {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 20px;

        .pic {
            position: relative;
            padding: 10px;
            margin-right: 10px;
            margin-bottom: 10px;

            .opera {
                position: absolute;
                top: -10px;
                left: 10px;
                width: calc(100% - 22px);
                height: 20px;
                line-height: 20px;
                border: 1px solid #eee;
                border-bottom: 0;

                span {
                    font-size: 12px;
                    display: inline-block;
                    text-align: center;
                    width: calc(50% - 1px);
                    cursor: pointer;

                    &:hover {
                        background-color: #ddd;
                    }

                    &:nth-child(1) {
                        border-right: 1px solid #eee;
                    }
                }
            }

            .img {
                position: relative;
                border: 1px solid #eee;
                width: 150px;
                height: 150px;
                overflow: hidden;

                img {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    max-width: 100%;
                }
            }

            .name {
                line-height: 20px;
            }
        }
    }
}
</style>
