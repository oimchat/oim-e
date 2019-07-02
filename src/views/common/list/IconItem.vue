<template>
    <div @click="onClick" @contextmenu='contextMenu'>
        <div :class="data.active? 'chat_item slide-left active' : 'chat_item slide-left'">
            <div class="ext">
                <p class="attr">{{data.time}}</p>
            </div>
            <div class="avatar">
                <img :class="data.gray?'img gray' : 'img'" :src="data.avatar" alt="">
                <i :class="data.red?'icon oim_chat_red_dot_middle':''">{{data.redCount>0?data.redCount:''}}</i>
            </div>

            <div class="info">
                <h3 class="nickname">
                    <span class="nickname_text">{{data.name}}</span>
                </h3>
                <p class="msg">
                    <span class="">{{data.text}}</span>
                </p>
            </div>
            <em @click="onDelete"></em>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import IconItemData from '@/views/common/list/IconItemData';
    import IconItemBox from '@/views/common/list/IconItemBox';

    @Component({})
    export default class IconItem extends Vue {
        @Prop({
            type: IconItemData,
            required: false,
            default: () => (new IconItemData()),
        })
        private data!: IconItemData;

        @Prop({
            type: IconItemBox,
            required: false,
            default: () => (new IconItemBox()),
        })
        private box!: IconItemBox;

        public onClick() {
            if (this.box && this.data) {
                this.box.select(this.data);
            }
            if (this.data) {
                this.selected(this.data);
                if (typeof this.data.onSelect === 'function') {
                    this.data.onSelect(this.data.key);
                }
            }
        }

        private onDelete() {
            if (this.data) {
                if (typeof this.data.onDelete === 'function') {
                    this.data.onDelete(this.data.key);
                }
            }
        }

        private contextMenu() {
            if (this.data) {
                this.onContextMenu(this.data);
            }
        }

        @Emit('on-selected')
        private selected(data: IconItemData) {
            // 选中
        }

        @Emit('on-context-menu')
        private onContextMenu(data: IconItemData) {
            // 菜单
        }
    }
</script>

<style scoped>

</style>
