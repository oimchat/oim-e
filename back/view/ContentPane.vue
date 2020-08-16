<template>
    <div :id="data.content.key" class="">
        <div class="clear_fix">
            <div style="overflow: hidden;">
                <div :class="data.isOwn?'message right':'message left'">
                    <div v-if="data.timeVisible" class="message_system ">
                        <div class="content">{{data.timeText}}</div>
                    </div>
                    <img class="avatar" :src="data.avatar" :title="data.name">
                    <div class="content message-font">
                        <h4 v-if="data.nameVisible && !data.isOwn" class="nickname">{{data.name}}</h4>
                        <div :class="data.isOwn?'bubble bubble_primary right':'bubble bubble_default left'">
                            <div class="bubble_cont ">
                                <div class="plain" @click="contentClick($event)">
                                    <div v-html="getContent" style="padding: 0px">
                                    </div>
                                    <!--                                    <img class="ico_loading ng-hide" src="" alt="">-->
                                    <i v-if="data.isOwn && data.status===2" class="ico_fail oim_chat_message_fail"
                                       title="重新发送"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import MessageContentWrap from '@/common/vue/data/content/impl/message/MessageContentWrap';
    import app from '@/app/App';
    import ContentUtil from '@/impl/util/ContentUtil';
    import FileDownload from '@/app/com/main/component/FileDownload';

    @Component({
        components: {},
    })
    export default class ContentPane extends Vue {
        @Prop({
            type: MessageContentWrap,
            required: false,
            default: () => (new MessageContentWrap()),
        })
        private data!: MessageContentWrap;

        private download(url: string) {
            const fileDownload: FileDownload = app.appContext.getMaterial(FileDownload);
            fileDownload.download(url);
        }

        private contentClick(e: Event) {
            const n = e.target;
            if (n instanceof Element) {

                const node = (n as Element);
                // 获取触发事件对象的属性
                const nodeName = node.nodeName.toLocaleLowerCase();
                if ('button' === nodeName) {
                    const url = node.getAttribute('file-url');
                    if (url) {
                        this.download(url);
                    }
                }
            }
        }

        get getContent() {
            let tag = '';
            if (this.data && this.data.content) {
                tag = ContentUtil.createChatContent(this.data.content);
            }
            return tag;
        }
    }
</script>

<style scoped>
    .message-font {
        color: #000000;
        font-size: 15px;
    }
</style>
