<template>
    <img :style="size" :src="data.path" name="face" :value="value" :title="data.text" :path="data.path">
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
    private data!: any | FaceValue;

    get value(): string {
        const v = this.data.categoryId + ',' + this.data.key;
        return v;
    }

    get size() {
        const data = this.data;
        const height = data.height;
        const width = data.width;
        if (height && width) {
            return {
                height: height + 'px',
                width: width + 'px',
            };
        } else {
            return {};
        }
    }
}
</script>

<style scoped>
.face {
    height: 24px;
    width: 24px;
}
</style>
