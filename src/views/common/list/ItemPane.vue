<template>
    <div
            @click="onClick" @contextmenu='contextMenu'
            :class="data.active? 'list-node-item active' : 'list-node-item'">
        <div class="avatar-pane">
            <div class="avatar">
                <img :class="data.gray?'img gray' : 'img'" :src="data.avatar" alt="">
                <i v-show="data.redCount > 0"
                   :class="'icon red-dot-middle'">{{data.redCount}}
                </i>
            </div>
        </div>
        <div class="center">
            <h3 class="nickname">
                <span class="nickname-text">{{data.name}}</span>
                <span class="extend">{{''}}</span>
            </h3>
            <p class="text">
                <span class="">{{data.text}}</span>
            </p>
        </div>
        <em></em>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import ItemData from './ItemData';
    import ItemBox from './ItemBox';

    @Component({})
    export default class ItemPane extends Vue {
        @Prop({
            type: ItemData,
            required: false,
            default: () => (new ItemData()),
        })
        private data!: ItemData;

        @Prop({
            type: ItemBox,
            required: false,
            default: () => (new ItemBox()),
        })
        private box!: ItemBox;

        public mounted() {
            // no
        }

        public onClick() {
            if (this.box && this.data) {
                this.box.select(this.data);
            }
            if (this.data) {
                this.selected(this.data);
            }
        }

        public contextMenu(e: MouseEvent) {
            if (this.data) {
                this.onContextMenu(e, this.data);
            }
        }

        @Emit('on-selected')
        private selected(data: ItemData) {
            // 选中
        }

        @Emit('on-context-menu')
        private onContextMenu(e: MouseEvent, data: ItemData) {
            // 菜单
        }
    }
</script>

<style lang="scss">

</style>
