<template>
    <div v-if="show" unselectable="on" onmousedown="return false;" class="popup slide-top" tabindex="-1"
         style="top: -272px; left: 15px;width: 420px">
        <div class="expression">
            <ul class="exp_hd">
                <li tab-name="face_tab" @click="onTab('classical')"
                    :class="tab==='classical'?'exp_hd_item active':'exp_hd_item'">
                    <a tab-name="face_tab" href="javascript:;">表情</a>
                </li>
                <li tab-name="face_tab" @click="onTab('emoji')"
                    :class="tab==='emoji'?'exp_hd_item active':'exp_hd_item'">
                    <a tab-name="face_tab" href="javascript:;">字符表情</a>
                </li>
            </ul>
            <div class="scroll-wrapper exp_bd scrollbar-dynamic" style="position: relative">
                <div class="exp_bd scrollbar-dynamic scroll-content" style="margin-bottom: 0px; margin-right: 0px;">
                    <div :class="tab==='classical'?'exp_cont active':'exp_cont'">
                        <div class="face">
                            <a v-for="item of faceList" :title="item.text" @click="onFace(item)">
                                <img :src="'assets/images/common/face/classical/png/'+item.key+'.png'"/>
                            </a>
                        </div>
                    </div>
                    <div :class="tab==='emoji'?'exp_cont active':'exp_cont'">
                        <div class="face">
                            <a v-for="item of list" :title="item.key" @click="onClick(item)">
                                <img :src="'assets/images/common/face/emoji/'+item.picture"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import EmojiBox from '@/app/lib/EmojiBox';
    import app from '@/app/App';
    import FaceBox from '@/app/com/main/box/FaceBox';
    import FaceValue from '@/app/com/data/chat/content/item/FaceValue';
    import emojiImageBox from '@/app/lib/EmojiImageBox';

    @Component({
        components: {},
    })
    export default class FacePane extends Vue {

        private list: Array<{ code: string, key: string, picture: string }> = [];
        private faceList: FaceValue[] = [];
        private show: boolean = false;
        private tab = 'classical';

        public mounted() {
            this.initialize();
        }

        public setShow(show: boolean) {
            this.show = show;
        }

        private initialize() {
            const own = this;
            this.list = emojiImageBox.getList();
            const faceBox: FaceBox = app.appContext.getMaterial(FaceBox);
            this.faceList = faceBox.getList('classical');
            document.addEventListener('click', (e) => {
                if (e.target instanceof Element) {
                    const n = e.target as Element;
                    const name = n.getAttribute('tab-name');
                    if (name !== 'face_tab') {
                        own.show = false;
                    }
                } else {
                    own.show = false;
                }

            }, true);
        }

        private onClick(value: { code: string, key: string, picture: string }) {
            this.selected('emoji', value.key);
        }

        private onFace(value: FaceValue) {
            this.selected(value.categoryId, value.key);
        }

        private onTab(tab: string) {
            this.tab = tab;
        }

        @Emit('on-selected')
        private selected(categoryId: string, value: string) {
            // 选中
        }
    }

</script>

<style scoped>
    .face {
        margin-right: -1px
    }

    .face a {
        float: left;
        width: 28px;
        height: 28px;
        font-size: 18px;

        border-bottom: 1px solid #f0f0f0;
        border-right: 1px solid #f0f0f0;
        cursor: pointer;
    }

</style>
