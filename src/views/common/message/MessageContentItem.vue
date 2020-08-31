<template>
    <component :is="currentComponent" :item="data" :data="data.value"></component>
</template>

<script lang="ts">
import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
import contentItem from '@/views/common/message/content';
import Item from '@/app/com/common/chat/Item';

@Component({
    components: contentItem,
})
export default class MessageContentItem extends Vue {
    @Prop({
        type: Item,
        required: false,
        default: () => (new Item()),
    })
    private data!: Item;
    private keys = Object.keys(contentItem);
    private name = 'ContentItemUnknown';

    get currentComponent(): string {
        let itemName = this.data.type;
        const length = itemName.length;
        itemName = itemName.substring(0, 1).toUpperCase() + itemName.substring(1, length);
        const name = 'ContentItem' + itemName;
        return this.has(name) ? name : this.name;
    }

    private has(name: string): boolean {
        const keys = this.keys;
        return keys.includes(name);
    }
}
</script>

<style scoped>

</style>
