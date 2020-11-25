<template>
    <div class="content">
        <slot />
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Content extends Vue {}
</script>
<style lang="stylus" scoped>
.content {
    position: relative;
    height: calc(100% - 64px - 39px - 48px);
    padding: 24px;
    overflow: hidden;
    background-color: #ffffff;
}
</style>
