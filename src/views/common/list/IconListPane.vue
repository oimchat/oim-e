<template>
    <div>
        <template v-for="item of items">
            <IconItem :data="item" :box="box" @on-selected="selected" @on-context-menu='onItemContextMenu'></IconItem>
        </template>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';

    import IconItem from '@/views/common/list/IconItem.vue';
    import IconItemData from '@/views/common/list/IconItemData';
    import IconItemBox from '@/views/common/list/IconItemBox';

    @Component({
        components: {
            IconItem,
        },
    })
    export default class IconListPane extends Vue {
        @Prop({
            type: Array,
            required: false,
            default: () => (new Array<IconItemData>()),
        })
        private items!: IconItemData[];

        @Prop({
            type: IconItemBox,
            required: false,
            default: () => (new IconItemBox()),
        })
        private box!: IconItemBox;

        @Emit('on-item-selected')
        private selected(data: IconItemData) {
            // 选中
        }

        @Emit('on-item-context-menu')
        private onItemContextMenu(data: IconItemData) {
            // 选中
        }
    }
</script>

<style scoped>

</style>
