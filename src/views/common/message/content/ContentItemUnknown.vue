<template>
    <div>
        <p>不支持的消息<a @click="show=!show" href="javascript:void(0)">点击查看原始内容</a></p>
        <p v-if="show">{{value}}</p>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import BaseUtil from '@/app/lib/util/BaseUtil';

    @Component({
        components: {},
    })
    export default class ContentItemUnknown extends Vue {
        @Prop({
            type: Object,
            required: false,
            default: () => (''),
        })
        private data!: object;
        private show = false;

        get value(): string {
            const data = this.data;
            let v = '';
            if (typeof data === 'object') {
                v = BaseUtil.objectToJson(data);
            }
            if (typeof data === 'string') {
                v = data;
            }
            return v;
        }
    }
</script>

<style scoped>

</style>
