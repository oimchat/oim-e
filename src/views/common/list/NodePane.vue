<template>
    <div class="list-node-pane">
        <div class="title" @click="onClick" @contextmenu='contextMenu'>
            <i :class="data.isOpen?'fa fa-angle-down':'fa fa-angle-right'"></i>
            <label></label>
            <label class="name">{{data.name}}</label>
            <label class="count">{{data.countText}}</label>
            <span class=""></span>
        </div>
        <div class="content" :style="data.isOpen?'display: block;':'display: none;'">
            <div v-for="item of data.items">
                <ItemPane :data="item" :box="box" @on-selected="onItemSelected"
                          @on-context-menu='onItemContextMenu'></ItemPane>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import ItemPane from './ItemPane.vue';
    import NodeData from './NodeData';
    import ItemData from './ItemData';
    import ItemBox from './ItemBox';

    @Component({
        components: {
            ItemPane,
        },
    })
    export default class NodePane extends Vue {
        private isOpen: boolean = false;

        @Prop({
            type: NodeData,
            required: false,
            default: () => (new NodeData()),
        })
        private data!: NodeData;

        @Prop({
            type: ItemBox,
            required: false,
            default: () => (new ItemBox()),
        })
        private box!: ItemBox;

        public onClick() {
            if (this.data) {
                this.data.isOpen = !this.data.isOpen;
            }
        }

        public contextMenu(e: MouseEvent) {
            if (this.data) {
                this.onContextMenu(e, this.data);
            }
        }

        @Emit('on-context-menu')
        private onContextMenu(e: MouseEvent, data: NodeData) {
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

<style lang="scss">


</style>
