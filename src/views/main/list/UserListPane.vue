<template>
    <div style="height: 100%">
        <RootPane :items="nodes" :box="box"
                  @on-node-context-menu='onNodeContextMenu'
                  @on-item-selected="onItemSelected"
                  @on-item-context-menu='onItemContextMenu'>

        </RootPane>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import RootPane from '../../common/list/RootPane.vue';
    import NodeData from '../../common/list/NodeData';
    import ListData from '@/impl/data/ListData';
    import ItemBox from '@/views/common/list/ItemBox';
    import ItemData from '@/views/common/list/ItemData';

    @Component({
        components: {
            RootPane,
        },
    })
    export default class UserListPane extends Vue {
        public nodes: NodeData[] = ListData.userNodes;
        private box: ItemBox = new ItemBox();

        public mounted() {
            // TODO
        }

        @Emit('on-node-context-menu')
        private onNodeContextMenu(e: MouseEvent, data: NodeData) {
            // 菜单
        }

        @Emit('on-item-selected')
        private onItemSelected(data: ItemData) {
            // TODO
        }

        @Emit('on-item-context-menu')
        private onItemContextMenu(e: MouseEvent, data: ItemData) {
            // 选中
        }
    }
</script>

<style scoped>

</style>
