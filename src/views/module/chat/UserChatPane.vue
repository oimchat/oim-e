<template>
    <base-chat-pane :data="data"
                    @on-read-scroll-top="onReadScrollTop"
                    @on-read-scroll="onReadScroll"

                    @on-write-key-press="onKeyPress"
                    @on-write-send="send"
    >
    </base-chat-pane>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import BaseChatPane from '@/views/module/chat/BaseChatPane.vue';
    import BaseChatMapper from '@/views/module/chat/BaseChatMapper';

    import userChatViewModel from '@/platform/vue/view/model/UserChatViewModel';
    import app from '@/app/App';

    import CoreContentUtil from '@/app/com/main/common/util/CoreContentUtil';
    import Content from '@/app/com/common/chat/Content';
    import Section from '@/app/com/common/chat/Section';
    import Item from '@/app/com/common/chat/Item';
    import FileValue from '@/app/com/common/chat/item/FileValue';
    import WebContentAnalysisUtil from '@/common/web/util/WebContentAnalysisUtil';
    import PromptType from '@/app/com/client/define/prompt/PromptType';
    import ContentWrap from '@/common/vue/data/content/ContentWrap';

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
            this.data.info = model.chatData;
            this.data.readMapper.items = model.data.list;

            model.cacheData.updateScroll = (size: number) => {
                data.readMapper.setScrollTop(size);
            };

            model.cacheData.getScrollHeight = () => {
                return data.readMapper.getScrollHeight();
            };

            model.cacheData.updateScrollIntoView = (viewId: string) => {
                data.readMapper.updateScrollIntoView(viewId);
            };

            model.cacheData.setInnerHTML = (html: string) => {
                data.writeMapper.setInnerHTML(html);
            };
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
            model.cacheData.data.html = data.writeMapper.getInnerHTML();
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
                    model.cacheData.data.html = '';
                } else {
                    model.send(content, (success, message) => {
                        if (!success) {
                            app.prompt(message, '警告', PromptType.warn);
                        } else {
                            data.writeMapper.setInnerHTML('');
                            data.writeMapper.keepCursorLastIndex();
                            model.cacheData.data.html = '';
                        }
                    });
                }
            }
        }

        private onSendFile(result: any, file: File) {
            const model = this.model;
            const data = this.data;
            if (result && result.body) {

                const content: Content = new Content();
                const section: Section = new Section();
                content.sections.push(section);


                const item: Item = new Item();
                item.type = Item.TYPE_FILE;


                const data = result.body;
                const id = data.id;
                const name = data.name;
                const size = data.size;
                const url = data.url;
                const iv: FileValue = new FileValue();
                iv.id = id;
                iv.name = name;
                iv.size = size;
                iv.url = url;

                item.value = iv;
                section.items.push(item);
                model.send(content, (success, message) => {
                    if (!success) {
                        app.prompt(message, '警告', PromptType.warn);
                    }
                });
            }
        }

        private handleScroll(info: { event: Event, scrollHeight: number, scrollTop: number, scrollPosition: string }) {
            const own = this;
            const model = this.model;
            if (info) {
                model.cacheData.data.scrollHeight = info.scrollHeight;
                model.cacheData.data.scrollTop = info.scrollTop;
                model.cacheData.data.scrollPosition = info.scrollPosition;
            }
        }

        private loadHistory() {
            userChatViewModel.loadHistory();
        }

        @Watch('model.chatData.key')
        private list(nv: ContentWrap[], ov: ContentWrap[]) {
            const data = this.data;
            const model = this.model;
            this.data.info = model.chatData;
            this.data.readMapper.items = model.data.list;
        }
    }
</script>

<style lang="scss" scoped>

</style>
