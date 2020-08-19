<template>
    <div class="box chat">
        <base-chat-pane :data="data"
                        :items="model.messageInfo.list"
                        @on-read-scroll-top="onReadScrollTop"
                        @on-read-scroll="onReadScroll"

                        @on-write-key-press="onKeyPress"
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
        </base-chat-pane>

        <!--end HD-->
        <div v-if='model.messageInfo.showPrompt' class="popup members-warp slide-down" tabindex="-1" style="">
            <div class="members compatible">
                <div class="members-inner">
                    {{model.messageInfo.prompt}}
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
    import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';
    import User from '@/app/com/main/module/business/user/bean/User';
    import Section from '@/app/com/common/chat/Section';
    import Content from '@/app/com/common/chat/Content';
    import Item from '@/app/com/common/chat/Item';
    import FileValue from '@/app/com/common/chat/item/FileValue';
    import GroupMemberListOfPersonalBox from '@/app/com/main/module/business/group/box/GroupMemberListOfPersonalBox';
    import GroupMemberService from '@/app/com/main/module/business/group/service/GroupMemberService';
    import PromptType from '@/app/com/client/define/prompt/PromptType';
    import ContentWrap from '@/common/vue/data/content/ContentWrap';
    import GroupMemberListEntity from '@/views/module/group/member/GroupMemberListEntity';
    import ChatReadViewEntity from '@/platform/vue/view/entity/ChatReadViewEntity';
    import ChatReadViewEntityDefaultImpl from '@/platform/vue/view/entity/impl/ChatReadViewEntityDefaultImpl';
    import ChatWriteViewEntity from '@/platform/vue/view/entity/ChatWriteViewEntity';
    import ChatWriteViewEntityDefaultImpl from '@/platform/vue/view/entity/impl/ChatWriteViewEntityDefaultImpl';
    import GroupJoinSettingMapper from '@/views/module/group/setting/GroupJoinSettingMapper';

    @Component({
        components: {
            BaseChatPane,
            GroupMemberListPane,
            GroupJoinSettingPane,
        },
    })
    export default class GroupChatPane extends Vue {
        private data: BaseChatMapper = new BaseChatMapper();
        private model = groupChatViewModel;
        private showMore: boolean = false;
        private groupJoinSettingMapper: GroupJoinSettingMapper = new GroupJoinSettingMapper();

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
        }
    }
</script>

<style scoped>
    .top-icon {
        font-size: 22px;
        cursor: pointer;
        margin-right: 5px;
    }

    .members-warp {
        top: 50px;
        margin-top: 1px;
        box-shadow: 1px 1px 1px #e0e0e0;
        -moz-box-shadow: 1px 1px 1px #e0e0e0;
        -webkit-box-shadow: 1px 1px 1px #e0e0e0;
        width: 100%
    }

    .members {
        padding: 10px 4px 8px 17px;
        background-color: #eee;
        border-bottom: 1px solid #dedede
    }

    .members-inner {
        margin-right: -4px;
        max-height: 300px;
        overflow-y: auto;
        overflow-x: hidden
    }

    .members-inner:after {
        content: "";
        display: block;
        clear: both
    }

    .member {
        float: left;
        position: relative;
        height: 85px;
        margin-right: 7px;
        margin-left: 7px;
        padding-top: 10px
    }

    .member.opt {
        cursor: pointer;
        margin-right: 15px
    }

    .member .avatar {
        display: block;
        cursor: pointer;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background-color: #ccc
    }

    .member .nickname {
        color: #888;
        width: 72px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        font-size: 12px;
        margin-left: -8px;
        vertical-align: middle
    }

    .member .nickname .emoji {
        vertical-align: -4px
    }

    .member .opt {
        position: absolute;
        font-size: 0;
        cursor: pointer;
        width: 18px;
        height: 10px;
        top: 2px;
        right: 0
    }
</style>
