<template>
    <div class="box chat">
        <base-chat-pane :data="data"
                        @on-read-scroll-top="onReadScrollTop"
                        @on-read-scroll="onReadScroll"

                        @on-write-key-press="onKeyPress"
                        @on-write-send="send"
        >
            <template slot="top-extend">
                <div style="float: right">
                    <i @click="showMore = true"
                       class="fas fa-arrow-alt-circle-down top-icon">
                    </i>
                </div>
            </template>
        </base-chat-pane>

        <!--end HD-->
        <div v-if='model.data.showPrompt' class="popup members-warp slide-down" tabindex="-1" style="">
            <div class="members compatible">
                <div class="members-inner">
                    {{model.data.prompt}}
                </div>
            </div>
        </div>
        <Drawer title="更多" width="340" :mask="false" :closable="true" v-model="showMore">
            <div v-if='isOwner'>
                <GroupJoinSettingPane :groupId='model.chatData.key'></GroupJoinSettingPane>
            </div>
            <div style="height: 100%;margin-top: 20px">
                <group-member-list-pane
                        :group-id="model.chatData.key"
                >
                </group-member-list-pane>
            </div>
        </Drawer>
        <GroupMemberContextMenu ref='groupMemberContextMenu'></GroupMemberContextMenu>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import BaseChatPane from '@/views/module/chat/BaseChatPane.vue';
    import BaseChatMapper from '@/views/module/chat/BaseChatMapper';
    import GroupMemberListPane from '@/views/module/group/member/GroupMemberListPane.vue';

    import GroupJoinSettingPane from '@/views/module/group/GroupJoinSettingPane.vue';
    import GroupMemberContextMenu from '@/views/module/group/member/menu/GroupMemberContextMenu.vue';

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

    @Component({
        components: {
            BaseChatPane,
            GroupMemberListPane,
            GroupJoinSettingPane,
            GroupMemberContextMenu,
        },
    })
    export default class GroupChatPane extends Vue {
        private data: BaseChatMapper = new BaseChatMapper();
        private model = groupChatViewModel;

        private groupMemberData: {
            users: User[],
        } = groupChatViewModel.groupMemberData;

        private showList: boolean = false;

        private showMore: boolean = false;
        private isOwner: boolean = false;

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
            this.keyChange();
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
            groupChatViewModel.loadHistory();
        }

        @Watch('model.chatData.key')
        private list(nv: ContentWrap[], ov: ContentWrap[]) {
            const data = this.data;
            const model = this.model;
            this.data.info = model.chatData;
            this.data.readMapper.items = model.data.list;
        }


        private getNickname(user: User): string {
            const service: GroupMemberService = app.appContext.getMaterial(GroupMemberService);
            const groupId = this.model.cacheData.key;
            let nickname = '';
            if (user) {
                nickname = service.getUserShowName(groupId, user);
            }
            return nickname;
        }

        private handleShowList() {
            this.showList = !this.showList;
        }

        @Watch('model.cacheData.key')
        private keyChange(): void {
            // no
            this.showList = false;
            this.showMore = false;

            const groupId = this.model.cacheData.key;
            const personalGroupMemberListBox: GroupMemberListOfPersonalBox = app.appContext.getMaterial(GroupMemberListOfPersonalBox);
            const position = personalGroupMemberListBox.getPosition(groupId);
            this.isOwner = (GroupMember.POSITION_OWNER === position);
        }

        private memberContextMenu(e: MouseEvent, user: User) {
            const groupId = this.model.cacheData.key;
            const userId = user.id;
            const menuName = 'groupMemberContextMenu';
            const menu: any = this.$refs[menuName];
            menu.show(e, groupId, userId);
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
