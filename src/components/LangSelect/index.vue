<template>
    <el-select v-model="lang" :size="size" placeholder="请选择" @change="handleSetLanguage">
        <el-option v-for="item in langOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
    </el-select>
</template>

<script lang="ts">
import { Component, Vue, Inject, Prop } from 'vue-property-decorator'
import config from '@/config/index.ts'

@Component
export default class extends Vue {
    @Prop({ default: 'medium', type: String }) size!: string
    private lang: String = ''
    private langOptions: object = []

    created () {
        this.langOptions = config.langOptions
        this.lang = this.$i18n.locale
    }

    private handleSetLanguage (lang: string) {
        this.$i18n.locale = lang
        this.$store.commit('lang/SET_LANG', lang)
        this.$emit('langChange')
    }
}
</script>
