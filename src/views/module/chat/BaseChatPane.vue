<template>
    <div class="only-full-pane">
        <!--begin HD-->
        <div class="top">
            <div :class="'top-title-warp'">
                <div class="top-extend">
                    <slot name="topExtend"></slot>
                </div>
                <div class="avatar">
                    <img :class="'img'" :src="data.info.avatar?data.info.avatar:avatar" alt="头像">
                </div>
                <div class="info">
                    <h3 class="nickname">
                        <span class="nickname-text">{{data.info.name}}</span>
                    </h3>
                    <p class="msg">
                        <span class="">{{data.info.text}}</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="oim-chat-pane">
            <q-splitter
                    v-model="splitterModel"
                    reverse
                    horizontal
                    unit="px"
            >
                <template v-slot:before>
                    <ReadPane :data="data.readMapper"
                              :items="items"
                              @on-scroll="onScroll"
                              @on-scroll-top="onTop"
                    >
                    </ReadPane>
                </template>
                <template v-slot:after>
                    <WritePane :data="data.writeMapper"
                               @on-send="onSend"
                               @on-key-press='onKeyPress'
                               @on-key-up="onKeyUp"
                               @on-input="onInput"
                               @on-file-content="onFile">
                        <slot name="writeTool"></slot>
                    </WritePane>
                </template>
            </q-splitter>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import ReadPane from '@/views/component/chat/ReadPane.vue';
    import WritePane from '@/views/component/chat/WritePane.vue';
    import BaseChatMapper from '@/views/module/chat/BaseChatMapper';
    import Content from '@/app/com/common/chat/Content';
    import ContentWrap from '@/common/vue/data/content/ContentWrap';
    import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';

    @Component({
        components: {
            ReadPane,
            WritePane,
        },
    })
    export default class BaseChatPane extends Vue {

        @Prop({
            type: Array,
            required: false,
            default: () => ([]),
        })
        public items!: ContentWrap [];
        private splitterModel = 190; // start at 150px
        private avatar = UserInfoUtil.USER_DEFAULT_AVATAR;
        @Prop({
            type: BaseChatMapper,
            required: false,
            default: () => (new BaseChatMapper()),
        })
        private data!: BaseChatMapper;

        public mounted() {
            this.initialize();
        }

        private initialize() {
            const own = this;
            // todo
        }


        @Emit('on-read-scroll')
        private onScroll(info: { event: Event, scrollHeight: number, scrollTop: number, scrollPosition: string }) {
            // no
        }

        @Emit('on-read-scroll-top')
        private onTop() {
            // no
        }


        @Emit('on-write-send')
        private onSend(content: Content) {
            // no
        }

        @Emit('on-write-key-press')
        private onKeyPress(evt: KeyboardEvent, e: Element) {
            // no
        }

        @Emit('on-write-key-up')
        private onKeyUp(evt: KeyboardEvent, e: Element) {
            // no
        }

        @Emit('on-write-input')
        private onInput(evt: InputEvent, e: Element) {
            // no
        }

        @Emit('on-write-file-content')
        private onFile(content: Content) {
            // no
        }
    }
</script>
<style lang="scss">
    .q-splitter__separator {
        z-index: 0;
    }
</style>

<style lang="scss" scoped>
    .top {
        padding-top: 10px;
        background-color: #fff;
        color: #000000;
        height: 65px;
        border-bottom: 1px solid #d2d2d2;
    }

    .title-wrap {
        position: relative;
        margin: 0 19px;
        z-index: 1024;
    }

    .title {
        font-weight: 400;
        height: 25px;
        display: inline-block;
        font-size: 18px
    }

    .avatar-wrap {
        float: left;
        position: relative;
        padding: 2px 0px 0px 10px;
    }

    .avatar {
        float: left;
        margin-right: 10px;
        position: relative
    }

    .avatar .img {
        display: block;
        width: 40px;
        height: 40px;
        /*border-radius: 2px;*/
        /*-moz-border-radius: 2px;*/
        /*-webkit-border-radius: 2px*/
        border-radius: 50%;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
    }

    .top-extend {
        margin-top: 20px;
        float: right;
    }


    .top-title-warp {
        overflow: hidden;
        padding: 6px 18px 11px;
        /*border-bottom: 1px solid #647481;*/
        position: relative
    }

    .top-title-warp.top {
        background-color: #2e3641
    }

    .top-title-warp.active {
        background: #cbced0
    }

    .top-title-warp.active .top-extend, .top-title-warp.active .info .msg {
        color: #181818
    }

    .top-title-warp .avatar {
        float: left;
        margin-right: 10px;
        position: relative;
        cursor: pointer;
    }

    .top-title-warp .avatar .img {
        display: block;
        width: 40px;
        height: 40px;
        /*border-radius: 2px;*/
        /*-moz-border-radius: 2px;*/
        /*-webkit-border-radius: 2px*/
        border-radius: 50%;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
    }

    .top-title-warp .avatar .icon {
        position: absolute;
        top: -6px;
        right: -6px;
        color: #fff;
        font-style: normal;
        font-size: 12px;
        text-align: center
    }

    .top-title-warp .info {
        overflow: hidden
    }

    .top-title-warp .info .nickname {
        font-weight: 400;
        font-size: 13px;
        color: #0a0a0a;
        line-height: 20px
    }

    .top-title-warp .info .nickname-text {
        width: 100%;
        font-size: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal
    }

    .top-title-warp .info .nickname_count, .top-title-warp .info .nickname-text {
        display: inline-block;
        *display: inline;
        *zoom: 1;
        vertical-align: top
    }

    .top-title-warp .info .msg {
        color: #989898;
        font-size: 13px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        height: 1.5em
    }

    .top-title-warp .top-extend {
        float: right;
        color: #6b6f7c;
        font-size: 13px;
        text-align: right
    }

    .top-title-warp .top-extend .attr {
        height: 19px;
        line-height: 1.5
    }
</style>
