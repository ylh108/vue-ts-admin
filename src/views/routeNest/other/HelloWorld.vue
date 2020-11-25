<template>
    <div class="form-detail">
        <van-form>
            <van-field v-for="(item,index) in formDate.lableAttr" :key="index" v-model="formDate.modelAttr[item.name]" :name="item.name" :label="item.label" input-aligin="right">
            </van-field>
        </van-form>
    </div>
</template>

<script>
export default {
    props: {
        formDate: Object

    },
    name: 'HelloWorld',
    data () {
        return {

            zidian: {
                '0': { sex: '女', age: '是' },
                '1': { sex: '男', age: '否' }
            }
        }
    },

    created () {
        console.log(this.formDate, '0000')
        // this.list.start.forEach((item)=>{
        //   item.sex=this.sexList[item.sex]
        //   item.age=this.applist[item.age]
        // })
    }
}
</script>
<style scoped >
.form-detail .van-field_lable {
    width: 120px;
}
</style>
