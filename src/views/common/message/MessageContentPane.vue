<template>
    <div>
        <div :id="data.content.key" :class="data.isOwn?'message right':'message left'">
            <div v-if="data.timeVisible" class="message-time">
                <div class="content">{{data.timeText}}</div>
            </div>
            <img class="avatar" :src="data.avatar" :title="data.name" onselectstart="return false;">
            <div class="content message-font">
                <h4 v-if="data.nameVisible && !data.isOwn" class="nickname">{{data.name}}</h4>
                <div :class="data.isOwn?'bubble bubble_primary right':'bubble bubble_default left'">
                    <div class="bubble_cont ">
                        <i class="arrow"></i>
                        <div class="plain" @click="contentClick($event)">
                            <div ref="contentPane" style="padding: 0">
                                <template v-if="hasSections" v-for="(section,index) of data.content.sections">
                                    <template v-if="!hasItems(section)&&index>0">
                                        <br>
                                    </template>
                                    <div>
                                        <template v-if="hasItems(section)" v-for="item of section.items">
                                            <message-content-item :data="item">
                                            </message-content-item>
                                        </template>
                                    </div>
                                </template>
                            </div>
                            <!--<img class="ico_loading ng-hide" src="" alt="">-->
                            <div v-if="data.isOwn && data.status===2" class="action-icon">
                                <i @click="resend" class="icon-fail fas fa-exclamation-circle"
                                   title="重新发送">
                                </i>
                            </div>
                            <div v-if="data.isOwn && data.status===0" class="action-icon">
                                <i class="icon-loading fas fa-redo-alt fa-spin"
                                   title="发送中">
                                </i>
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
import FileDownload from '@/app/com/main/component/FileDownload';
import Section from '@/app/com/common/chat/Section';
import MessageContentItem from '@/views/common/message/MessageContentItem.vue';
import DocumentUtil from '@/common/web/util/DocumentUtil';


@Component({
    components: {
        MessageContentItem,
    },
})
export default class ContentPane extends Vue {

    get hasSections() {
        const data = this.data;
        const has = (data && data.content && data.content.sections && data.content.sections.length > 0);
        return has;
    }
    @Prop({
        type: MessageContentWrap,
        required: false,
        default: () => (new MessageContentWrap()),
    })
    private data!: MessageContentWrap;


    public appendElement(html: string) {
        const contentPaneName = 'contentPane';
        const contentPane = this.$refs[contentPaneName];
        if (contentPane) {
            DocumentUtil.appendElement(contentPane as Element, html);
        }
    }

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

    private resend() {
        const data = this.data;
        if (typeof data.resend === 'function') {
            this.data.resend(this.data.content);
        }
    }

    private hasItems(section: Section) {
        const has = (section && section.items && section.items.length > 0);
        return has;
    }

    private getText(value: string) {
        return 'text';
    }
}
</script>
<style>
    .bubble_cont img {
        vertical-align: middle;
        max-width: 100%;
    }
</style>
<style lang="scss" scoped>
    @import "message";
</style>
