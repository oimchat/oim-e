<template>
    <div class="box chat">
        <base-chat-pane :data="data"
                        :items="model.messageData.list"
                        @on-read-scroll-top="onReadScrollTop"
                        @on-read-scroll="onReadScroll"

                        @on-write-key-press="onKeyPress"
                        @on-write-key-up="onKeyUp"
                        @on-write-input="onInput"
                        @on-write-send="send"
                        @on-write-file-content="onFileContent"
        >
            <template slot="topExtend">
                <div style="float: right">
                    <i @click="showMore = true"
                       class="fas fa-arrow-alt-circle-down top-icon">
                    </i>
                </div>
            </template>
            <template slot="writeTool">
                <div style="float: right">

                </div>
            </template>
        </base-chat-pane>

        <!--end HD-->
        <div v-if='model.messageData.promptShow&&!model.atInfo.show' tabindex="-1">
            <div class="prompt-message" @click="toMessageKeyView(model.messageData.promptKey)">
                <div class="prompt-message-inner">
                    {{model.messageData.promptText}}
                </div>
            </div>
        </div>
        <div v-if='model.atInfo.show' tabindex="-1">
            <div class="prompt-message" @click="toMessageKeyView(model.atInfo.messageKey)">
                <div class="prompt-message-inner">
                    {{model.atInfo.chatUserName}}@我：{{model.atInfo.chatText}}
                </div>
            </div>
        </div>
        <Drawer class="only-shadow" title="更多" width="340" :mask="false" :closable="true" v-model="showMore">
            <div v-show='groupJoinSettingMapper.isOwner' class="only-border-bottom" style="padding-bottom: 20px">
                <GroupJoinSettingPane :data="groupJoinSettingMapper"></GroupJoinSettingPane>
            </div>
            <div style=";margin-top: 20px">
                <group-member-list-pane
                        :group-id="model.viewData.key"
                >
                </group-member-list-pane>
            </div>
        </Drawer>
        <at-list-pane :data="atListMapper"></at-list-pane>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import BaseChatPane from '@/views/module/chat/BaseChatPane.vue';
    import BaseChatMapper from '@/views/module/chat/BaseChatMapper';
    import GroupMemberListPane from '@/views/module/group/member/GroupMemberListPane.vue';

    import GroupJoinSettingPane from '@/views/module/group/setting/GroupJoinSettingPane.vue';

    import groupChatViewModel from '@/platform/vue/view/model/GroupChatViewModel';

    import app from '@/app/App';
    import CoreContentUtil from '@/app/com/common/chat/util/CoreContentUtil';
    import User from '@/app/com/main/module/business/user/bean/User';
    import Content from '@/app/com/common/chat/Content';
    import GroupMemberService from '@/app/com/main/module/business/group/service/GroupMemberService';
    import PromptType from '@/app/com/client/define/prompt/PromptType';
    import ContentWrap from '@/common/vue/data/content/ContentWrap';
    import ChatReadViewEntity from '@/platform/vue/view/entity/ChatReadViewEntity';
    import ChatReadViewEntityDefaultImpl from '@/platform/vue/view/entity/impl/ChatReadViewEntityDefaultImpl';
    import ChatWriteViewEntity from '@/platform/vue/view/entity/ChatWriteViewEntity';
    import ChatWriteViewEntityDefaultImpl from '@/platform/vue/view/entity/impl/ChatWriteViewEntityDefaultImpl';
    import GroupJoinSettingMapper from '@/views/module/group/setting/GroupJoinSettingMapper';
    import DocumentUtil from '@/common/web/util/DocumentUtil';
    import AtListMapper from '@/views/component/at/AtListMapper';
    import AtListPane from '@/views/component/at/AtListPane.vue';

    @Component({
        components: {
            BaseChatPane,
            GroupMemberListPane,
            GroupJoinSettingPane,
            AtListPane,
        },
    })
    export default class GroupChatPane extends Vue {
        private data: BaseChatMapper = new BaseChatMapper();
        private model = groupChatViewModel;
        private showMore: boolean = false;
        private groupJoinSettingMapper: GroupJoinSettingMapper = new GroupJoinSettingMapper();
        private atListMapper: AtListMapper = new AtListMapper();

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
                own.keyChange(key);
            });

            this.atListMapper.onAt = (userId, name, node) => {
                if (node && userId && name) {
                    this.addAt(userId, name);
                    const nodeValue = node.nodeValue;
                    if (nodeValue) {
                        const at = '@';
                        const length = nodeValue.length;
                        const lastIndex = nodeValue.lastIndexOf(at);
                        if (lastIndex > -1 && lastIndex < length) {
                            node.nodeValue = nodeValue.substring(0, lastIndex);
                        }
                    }
                }
            };
        }

        private initialize() {
            const own = this;
            // todo
            this.keyChange(own.model.viewData.key);
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

        private addAt(userId: string, name: string) {
            const html = '<a name="at" value="' + userId + '" contenteditable="false" href="javascript:void(0)">@' + name + '</a>';
            this.data.writeMapper.insertHtmlAtCursor(html);
        }

        private onInput(evt: InputEvent, e: Element) {
            // no
            this.atListMapper.handleInput(evt, e);
        }

        private onKeyUp(evt: KeyboardEvent, e: Element) {
            // no
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
            groupChatViewModel.loadHistory();
        }

        private toMessageKeyView(messageKey: string) {
            this.model.atInfo.show = false;
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


        private getNickname(user: User): string {
            const service: GroupMemberService = app.appContext.getMaterial(GroupMemberService);
            const groupId = this.model.viewData.key;
            let nickname = '';
            if (user) {
                nickname = service.getUserShowName(groupId, user);
            }
            return nickname;
        }


        private keyChange(groupId: string): void {
            // no
            // this.showMore = false;
            this.groupJoinSettingMapper.setGroupId(groupId);
            this.atListMapper.setGroupId(groupId);
        }
    }
</script>

<style scoped>
    .top-icon {
        font-size: 22px;
        cursor: pointer;
        margin-right: 5px;
    }

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
