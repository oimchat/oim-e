<template>
    <div>
        <template v-for="item of items">
            <NodePane
                    :data="item"
                    :box="box"
                    @on-context-menu="onNodeContextMenu"
                    @on-item-selected="onItemSelected"
                    @on-item-context-menu='onItemContextMenu'>
            </NodePane>
        </template>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import NodePane from './NodePane.vue';
    import NodeData from './NodeData';
    import ItemBox from './ItemBox';
    import ItemData from './ItemData';

    @Component({
        components: {
            NodePane,
        },
    })
    export default class RootPane extends Vue {
        @Prop({
            type: Array,
            required: false,
            default: () => (new Array<NodeData>()),
        })
        private items!: NodeData[];

        @Prop({
            type: ItemBox,
            required: false,
            default: () => (new ItemBox()),
        })
        private box!: ItemBox;

        @Emit('on-node-context-menu')
        private onNodeContextMenu(e: MouseEvent, data: NodeData) {
            // 菜单
        }

        @Emit('on-item-selected')
        private onItemSelected(data: ItemData) {
            // 选中
        }

        @Emit('on-item-context-menu')
        private onItemContextMenu(e: MouseEvent, data: ItemData) {
            // 选中
        }
    }
</script>

<style scoped>

</style>
