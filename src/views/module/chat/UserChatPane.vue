<template>
    <div class="box chat">
        <base-chat-pane :data="data"
                        :items="model.messageData.list"
                        @on-read-scroll-top="onReadScrollTop"
                        @on-read-scroll="onReadScroll"

                        @on-write-key-press="onKeyPress"
                        @on-write-send="send"
                        @on-write-file-content="onFileContent"
        >
            <template slot="writeTool">

            </template>
        </base-chat-pane>
        <div v-if='model.messageData.promptShow' tabindex="-1">
            <div class="prompt-message" @click="toMessageKeyView(model.messageData.promptKey)">
                <div class="prompt-message-inner">
                    {{model.messageData.promptText}}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import BaseChatPane from '@/views/module/chat/BaseChatPane.vue';
    import BaseChatMapper from '@/views/module/chat/BaseChatMapper';

    import userChatViewModel from '@/platform/vue/view/model/UserChatViewModel';
    import app from '@/app/App';

    import CoreContentUtil from '@/app/com/common/chat/util/CoreContentUtil';
    import Content from '@/app/com/common/chat/Content';
    import Section from '@/app/com/common/chat/Section';
    import Item from '@/app/com/common/chat/Item';
    import FileValue from '@/app/com/common/chat/item/FileValue';
    import WebContentAnalysisUtil from '@/common/web/util/WebContentAnalysisUtil';
    import PromptType from '@/app/com/client/define/prompt/PromptType';
    import ContentWrap from '@/common/vue/data/content/ContentWrap';
    import ChatReadViewEntity from '@/platform/vue/view/entity/ChatReadViewEntity';
    import ChatWriteViewEntity from '@/platform/vue/view/entity/ChatWriteViewEntity';
    import ChatReadViewEntityDefaultImpl from '@/platform/vue/view/entity/impl/ChatReadViewEntityDefaultImpl';
    import ChatWriteViewEntityDefaultImpl from '@/platform/vue/view/entity/impl/ChatWriteViewEntityDefaultImpl';

    @Component({
        components: {
            BaseChatPane,
        },
    })
    export default class UserChatPane extends Vue {
        private data: BaseChatMapper = new BaseChatMapper();
        private model = userChatViewModel;

        public mounted() {
            this.initialize();
            const own = this;
            const data = this.data;
            const model = this.model;
            this.data.info = model.info;

            const readViewEntity: ChatReadViewEntity = {
                setScrollTop(size: number) {
                    data.readMapper.setScrollTop(size);
                },
                getScrollHeight(): number {
                    return data.readMapper.getScrollHeight();
                },
                updateScrollIntoView(viewId: string): void {
                    data.readMapper.updateScrollIntoView(viewId);
                },
            } as ChatReadViewEntityDefaultImpl;
            const writeViewEntity: ChatWriteViewEntity = {
                setInnerHTML(html: string) {
                    data.writeMapper.setInnerHTML(html);
                },
                getInnerHTML() {
                    return data.writeMapper.getInnerHTML();
                },
            } as ChatWriteViewEntityDefaultImpl;
            model.setReadViewEntity(readViewEntity);
            model.setWriteViewEntity(writeViewEntity);
            model.setOnKeyChange((key: string) => {
                // no
            });
        }

        private initialize() {
            const own = this;
            // todo
        }

        private onReadScroll(info: { event: Event, scrollHeight: number, scrollTop: number, scrollPosition: string }) {
            this.handleScroll(info);
        }

        private onReadScrollTop() {
            this.loadHistory();
        }

        private onKeyPress() {
            const own = this;
            const model = this.model;
            const data = this.data;
            model.viewData.data.html = data.writeMapper.getInnerHTML();
        }

        private send(content: Content) {
            const model = this.model;
            const data = this.data;
            if (content) {
                const text = CoreContentUtil.getText(content);
                const itemSize = CoreContentUtil.getItemSize(content);
                if (text.length > 10000 || itemSize > 1000) {
                    app.prompt('内容过长！', '警告', PromptType.warn);
                }
                if (itemSize === 0) {
                    data.writeMapper.setInnerHTML('');
                    data.writeMapper.keepCursorLastIndex();
                    model.viewData.data.html = '';
                } else {
                    model.send(content, (success, message) => {
                        if (!success) {
                            app.prompt(message, '警告', PromptType.warn);
                        } else {
                            data.writeMapper.setInnerHTML('');
                            data.writeMapper.keepCursorLastIndex();
                            model.viewData.data.html = '';
                        }
                    });
                }
            }
        }

        private onFileContent(content: Content) {
            const model = this.model;
            const data = this.data;
            model.send(content, (success, message) => {
                if (!success) {
                    app.prompt(message, '警告', PromptType.warn);
                }
            });
        }

        private handleScroll(info: { event: Event, scrollHeight: number, scrollTop: number, scrollPosition: string }) {
            const own = this;
            const model = this.model;
            if (info) {
                model.viewData.data.scrollHeight = info.scrollHeight;
                model.viewData.data.scrollTop = info.scrollTop;
                model.viewData.data.scrollPosition = info.scrollPosition;
            }
        }

        private loadHistory() {
            userChatViewModel.loadHistory();
        }

        private toMessageKeyView(messageKey: string) {
            if (messageKey) {
                this.data.readMapper.updateScrollIntoView(messageKey);
            }
        }

        @Watch('model.chatData.key')
        private list(nv: ContentWrap[], ov: ContentWrap[]) {
            const data = this.data;
            const model = this.model;
            this.data.info = model.info;
        }
    }
</script>

<style lang="scss" scoped>
    .prompt-message {
        background-color: #d7d7d7;
        z-index: 1024;
        cursor: pointer;
        position: relative;
        top: 0;
        right: 0;
        left: 0;
    }
</style>
