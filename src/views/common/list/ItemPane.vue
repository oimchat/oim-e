<template>
    <div @click="onClick" @contextmenu='contextMenu'
         :class="data.active? 'icon-list-item active' : 'icon-list-item'">
        <div class="ext">
            <p class="attr">{{''}}</p>
        </div>
        <div class="avatar">
            <img :class="data.gray?'img gray' : 'img'" :src="data.avatar" alt="">
            <i :class="data.red?'icon red-dot-middle':''">{{data.redCount>0?data.redCount:''}}</i>
        </div>

        <div class="info">
            <h3 class="nickname">
                <span class="nickname-text">{{data.name}}</span>
            </h3>
            <p class="msg">
                <span class="">{{data.text}}</span>
            </p>
        </div>
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
