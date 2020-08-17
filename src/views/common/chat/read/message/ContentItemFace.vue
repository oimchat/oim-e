<template>
    <img :src="data.path" name="face" :value="value" :path="data.path">
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import FaceValue from '@/app/com/common/chat/item/FaceValue';

    @Component({
        components: {},
    })
    export default class ContentItemFace extends Vue {
        @Prop({
            type: Object,
            required: false,
            default: () => ({}),
        })
        private data!: any;

        get value(): string {
            const v = this.data.categoryId + ',' + this.data.key;
            return v;
        }
    }
</script>

<style scoped>

</style>
