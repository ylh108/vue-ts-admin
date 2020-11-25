<template>
    <div class="loginForm">
        <div class="title-container">
            <h3 class="title">
                {{ $t('login.title') }}
            </h3>
            <lang-select class="set-language" @langChange="langChange" />
        </div>
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="100px" @keyup.native.enter="handleLogin">
            <el-form-item :label="$t('login.username')" prop="username">
                <el-input type="text" ref="username" :placeholder="$t('login.placeholderUsername')" v-model="loginForm.username" autocomplete="on"></el-input>
            </el-form-item>
            <el-form-item :label="$t('login.password')" prop="password">
                <el-input type="password" ref="password" :placeholder="$t('login.placeholderPassword')" v-model="loginForm.password" autocomplete="on"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="loading" @click="handleLogin">{{ $t('login.signIn') }}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import { Form as ElForm, Input } from 'element-ui'
import store from '@/store'
import router from '@/router'
import LangSelect from '@/components/LangSelect/index.vue'

@Component({
    components: {
        LangSelect
    }
})
export default class Login extends Vue {
    private loading: boolean = false
    private loginForm: any = {
        username: '',
        password: ''
    }

    langChange () {
        ;(this.$refs.loginForm as ElForm).validate(async (valid: boolean) => {
            if (!valid) {
                this.handleLogin()
            }
        })
    }

    vUsername (rule: object, value: string, callback: Function) {
        if (!value) {
            callback(new Error((this as any).$t('login.tipsUsername')))
        } else {
            callback()
        }
    }
    vPassword (rule: object, value: string, callback: Function) {
        if (!value) {
            callback(new Error((this as any).$t('login.tipsPassword')))
        } else {
            callback()
        }
    }

    mounted () {
        // if (!this.loginForm.username) {
        //     ;(this.$refs.username as Input).focus()
        // } else if (!this.loginForm.password) {
        //     ;(this.$refs.password as Input).focus()
        // }
    }

    private loginRules: object = {
        username: [{ validator: this.vUsername, trigger: 'blur' }],
        password: [{ validator: this.vPassword, trigger: 'blur' }]
    }

    handleLogin () {
        ;(this.$refs.loginForm as ElForm).validate(async (valid: boolean) => {
            if (valid) {
                this.loading = true
                ;(this as any).$axios.post('/getTreeData').then((res: any) => {
                    this.loading = false
                    if (res.status === 200) {
                        this.clear()
                        this.$message.success('登录成功')
                        store.commit(
                            'login/SET_USERNAME',
                            this.loginForm.username
                        )
                        store.commit('tags/SET_ACTIVE')
                        store.commit('header/SET_NAVIGATION')
                        store.commit('tags/SET_TAGS', {
                            name: '首页',
                            value: '/home'
                        })
                        store.commit('sliderMenu/SET_TREEDATA', res.data)
                        store.commit(
                            'header/SET_NAVIGATIONLIST',
                            store.getters['sliderMenu/getTreeData']
                        )
                        store.commit('header/SET_SLIDERZOOM', false)
                        store.commit('header/SET_FIXEDZOOM', false)
                        router.push({ name: 'home' })
                    }
                })
            }
        })
    }

    clear () {
        let state: any = store.state
        state.tags.tags = []
        store.commit('tags/SET_TAGS')
    }
}
</script>
<style lang="stylus">
.title-container {
    position: relative;

    .title {
        font-size: 26px;
        color: $lightGray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
    }

    .set-language {
        color: #fff;
        position: absolute;
        top: 0px;
        font-size: 18px;
        right: 0px;
        width: 100px;
    }
}

.loginForm {
    width: 400px;
    border: 1px solid #eeeeee;
    padding: 30px;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
