<template>
    <label v-html="item.data"></label>
</template>

<script lang="ts">
import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
import Item from '@/app/com/common/chat/Item';

@Component({
    components: {},
})
export default class ContentItemText extends Vue {
    @Prop({
        type: String,
        required: false,
        default: () => (''),
    })
    private data!: string;
    @Prop({
        type: Item,
        required: false,
        default: () => (new Item()),
    })
    private item!: Item;
}
</script>

<style scoped>

</style>
