<template>
    <div :id="data.content.id" class="">
        <div class="clear_fix">
            <div style="overflow: hidden;">
                <div :class="data.isOwn?'message right':'message left'">
                    <div v-if="data.timeVisible" class="message_system ">
                        <div class="content">{{getTime}}</div>
                    </div>
                    <img class="avatar" :src="getAvatar" :title="getName">
                    <div class="content">
                        <h4 v-if="data.showNameVisible && !data.isOwn" class="nickname">{{data.showName}}</h4>
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
    import ContentData from './ContentData';
    import UserInfoUtil from '@/app/com/main/util/UserInfoUtil';
    import app from '@/app/App';
    import ContentUtil from '@/impl/util/ContentUtil';
    import FileDownload from '@/app/com/main/component/FileDownload';

    @Component({
        components: {},
    })
    export default class ContentPane extends Vue {
        @Prop({
            type: ContentData,
            required: false,
            default: () => (new ContentData()),
        })
        private data!: ContentData;

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

        get getAvatar() {
            let avatar = '';
            if (this.data) {
                avatar = UserInfoUtil.getHeadImage(this.data.user);
            } else {
                avatar = UserInfoUtil.getDefaultAvatar();
            }
            return avatar;
        }

        get getName() {
            let name = '';
            if (this.data) {
                name = this.data.showName;
                if (name === '' || !name) {
                    if (this.data.user) {
                        name = UserInfoUtil.getShowName(this.data.user);
                    }
                }
            }
            return name;
        }

        get getContent() {
            let tag = '';
            if (this.data && this.data.content) {
                tag = ContentUtil.createChatContent(this.data.content);
            }
            return tag;
        }

        get getTime() {
            let time = '';
            if (this.data && this.data.content) {
                const timestamp = this.data.content.timestamp;
                const date = (timestamp) ? new Date(timestamp) : new Date();
                const dateTimestamp = new Date().getTime();
                const isOverDay = (dateTimestamp - timestamp) > (1000 * 60 * 60 * 12);
                time = (isOverDay) ? ContentUtil.format('MM-dd hh:mm:ss', date) : ContentUtil.format('hh:mm:ss', date);
            }
            return time;
        }
    }
</script>

<style scoped>

</style>
