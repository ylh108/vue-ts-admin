<template>
    <div>
        <helloWorld :formDate="formDatelist"></helloWorld>
    </div>
</template>

<script>
import helloWorld from './HelloWorld'
export default {
    components: {
        helloWorld
    },
    data () {
        return {
            formDatelist: {
                lableAttr: [
                    {
                        label: '姓名',
                        name: 'name'
                    },
                    {
                        label: '年龄',
                        name: 'age'
                    },
                    {
                        label: '性别',
                        name: 'sex'
                    },
                    {
                        label: '存在么',
                        name: 'exist'
                    }
                ],
                modelAttr: {
                    name: '张三',
                    age: 18,
                    sex: '3',
                    exist: '1'
                }
                // sex 1男 2女 3未知
                // exist：1存在2不存在
            }
        }
    }
}
</script>
