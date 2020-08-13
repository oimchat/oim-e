<template>
    <div class="box chat">
        <!--begin HD-->
        <div class="box_hd">
            <div></div>
            <div class="title_wrap">
                <div class="title poi">
                    <a @click="handleShowList" class="title_name ng-binding" data-username="">{{chatData.name}}</a>
                    <i class="oim_chat_down_icon "></i>
                </div>
                <div v-if='isOwner' style="float: right">
                    <Icon @click="showMore = true" type="ios-arrow-dropdown"
                          style='font-size: 32px;cursor: pointer'/>
                </div>
            </div>
        </div>
        <div>
            <div v-if="showList" class="popup members_wrp slide-down" tabindex="-1" style="">
                <div class="members compatible">
                    <div class="members_inner">
                        <div v-for='item in groupMemberData.users' @contextmenu='memberContextMenu($event,item)'
                             class="member">
                            <img class="avatar" :src="item.avatar" alt="" :title="getNickname(item)">
                            <p class="nickname" style="text-align: center;">{{getNickname(item)}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--end HD-->
        <!--begin BD-->
        <div ref="messageListPane" @scroll="handleScroll" class="scroll-wrapper box_bd chat_bd scrollbar-dynamic"
             style="position: absolute;">
            <MessagePane :items="messageInfo.list"></MessagePane>
        </div>
        <div v-if='messageInfo.showPrompt' class="popup members_wrp slide-down" tabindex="-1" style="">
            <div class="members compatible">
                <div class="members_inner">
                    {{messageInfo.prompt}}
                </div>
            </div>
        </div>
        <WritePane ref="writePane"
                   @on-send="send"
                   @on-key-press='onKeyPress'
                   @on-key-up='onKeyUp'
                   @on-file="onSendFile">

        </WritePane>
        <Drawer title="更多" width="340" :mask="false" :closable="true" v-model="showMore">
            <div v-if='showMore'>
                <GroupJoinSettingPane :groupId='chatData.key'></GroupJoinSettingPane>
            </div>
        </Drawer>
        <GroupMemberContextMenu ref='groupMemberContextMenu'></GroupMemberContextMenu>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import MessagePane from '@/views/common/chat/ReadPane.vue';
    import WritePane from '@/views/common/chat/WritePane.vue';

    import GroupJoinSettingPane from '@/views/module/group/GroupJoinSettingPane.vue';
    import GroupMemberContextMenu from '../../src/views/module/group/member/menu/GroupMemberContextMenu.vue';

    import groupChatViewModel from '../../src/platform/vue/view/model/GroupChatViewModel';

    import app from '@/app/App';
    import GroupChatController from '@/app/com/main/module/business/chat/controller/GroupChatController';
    import ContentUtil from '@/impl/util/ContentUtil';
    import CoreContentUtil from '../../src/app/com/common/chat/util/CoreContentUtil';
    import ContentUploadImageService from '@/app/com/main/module/support/file/service/ContentUploadImageService';
    import UploadResult from '@/app/com/main/module/support/file/data/UploadResult';
    import ImageValue from '@/app/com/common/chat/item/ImageValue';
    import BaseUtil from '@/app/lib/util/BaseUtil';
    import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';
    import User from '@/app/com/main/module/business/user/bean/User';
    import Section from '@/app/com/common/chat/Section';
    import Content from '@/app/com/common/chat/Content';
    import Item from '@/app/com/common/chat/Item';
    import FileValue from '@/app/com/common/chat/item/FileValue';
    import GroupMemberListOfPersonalBox from '../../src/app/com/main/module/business/group/box/GroupMemberListOfPersonalBox';
    import GroupMemberService from '@/app/com/main/module/business/group/service/GroupMemberService';
    import DocumentUtil from '@/common/web/util/DocumentUtil';
    import GroupChatDataController from '@/app/com/main/module/business/chat/controller/GroupChatDataController';
    import ImageItemFileConverter from '@/app/define/file/ImageItemFileConverter';

    @Component({
        components: {
            MessagePane,
            WritePane,
            GroupJoinSettingPane,
            GroupMemberContextMenu,
        },
    })
    export default class GroupChatPane extends Vue {
        private chatData = groupChatViewModel.info;
        private messageInfo = groupChatViewModel.messageInfo;
        private cacheData = groupChatViewModel.viewData;

        private groupMemberData: {
            users: User[],
        } = groupChatViewModel.groupMemberData;

        private showList: boolean = false;

        private showMore: boolean = false;
        private isOwner: boolean = false;

        public mounted() {
            this.initialize();

            groupChatViewModel.viewData.updateScroll = (size: number) => {
                const messageListPaneName = 'messageListPane';
                const messageListPane: any = this.$refs[messageListPaneName];
                if (messageListPane) {
                    messageListPane.scrollTop = size;
                }
            };

            groupChatViewModel.viewData.getScrollHeight = () => {
                const messageListPaneName = 'messageListPane';
                const messageListPane: any = this.$refs[messageListPaneName];
                const height = (messageListPane) ? messageListPane.scrollHeight : 0;
                return height;
            };

            groupChatViewModel.viewData.setInnerHTML = (html: string) => {
                const writePaneName = 'writePane';
                const writePane: any = this.$refs[writePaneName];
                if (writePane) {
                    writePane.setInnerHTML(html);
                }
            };
        }

        private initialize() {
            const own = this;
            // todo
            const messageListPaneName = 'messageListPane';
            const messageListPane = this.$refs[messageListPaneName];
            if (messageListPane instanceof Element) {
                const messageListElement = messageListPane as Element;
                messageListElement.addEventListener('mousewheel', (e: Event) => {
                    if (e instanceof WheelEvent) {
                        const ev: WheelEvent = e as WheelEvent;

                        const deltaY = e.deltaY;

                        if (deltaY < 0) {
                            // 向上
                            const target = messageListElement;
                            const node = target as Element;
                            const height = node.scrollHeight;
                            const top = node.scrollTop;

                            const clientHeight = node.clientHeight;
                            let position = '';
                            const a = (height - top);
                            const b = (clientHeight + 25);

                            if (height === clientHeight) {
                                // 滚动条没有出来
                                if (top === 0) {
                                    position = 'top';
                                    own.cacheData.data.scrollTopCount++;
                                    if (own.cacheData.data.scrollTopCount > 3) {
                                        own.loadHistory();
                                        own.cacheData.data.scrollTopCount = 0;
                                    }
                                }
                            } else {
                                if (a < b) {
                                    position = 'bottom';
                                } else if (top === 0) {
                                    position = 'top';
                                    own.cacheData.data.scrollTopCount++;
                                    if (own.cacheData.data.scrollTopCount > 3) {
                                        own.loadHistory();
                                        own.cacheData.data.scrollTopCount = 0;
                                    }
                                } else {
                                    position = 'middle';
                                }
                            }
                        }
                    }
                });
            }
            this.keyChange();
        }

        private onKeyPress(e: KeyboardEvent, inputArea: Element) {

            if (e.key === '@') {
                e.returnValue = false;
                DocumentUtil.getCursorLocation(inputArea);
                return false;
            }
        }

        private onKeyUp(e: KeyboardEvent, inputArea: Element) {
            this.cacheData.data.html = (inputArea).innerHTML;
        }

        private send(inputArea: any) {
            const childNodes: Element[] = inputArea.childNodes;
            if (childNodes) {
                const groupId = this.chatData.key;
                const content = ContentUtil.getContent(childNodes);
                if (content) {
                    const text = CoreContentUtil.getText(content);
                    const itemSize = CoreContentUtil.getItemSize(content);
                    if (text.length > 10000 || itemSize > 1000) {
                        this.$Notice.warning({
                            title: '警告',
                            desc: '内容过长！',
                        });
                    }
                    if (itemSize === 0) {
                        inputArea.innerHTML = '';
                        this.cacheData.data.html = '';
                    } else {
                        const items = CoreContentUtil.getImageItemList(content);
                        try {

                            // const map: Map<string, File> = (wuh) ? wuh.getFileMapByItems(items) : new Map<string, File>(); //
                            const handleItemsBack = (map: Map<string, File>) => {
                                if (map.size > 0) {
                                    const cuis: ContentUploadImageService = app.appContext.getMaterial(ContentUploadImageService);
                                    cuis.uploadImages(map, (success: boolean, rm: Map<string, UploadResult>, message?: string) => {
                                        if (success) {
                                            for (const item of items) {
                                                const iv: ImageValue = BaseUtil.jsonToObject(item.value);
                                                if (iv) {
                                                    const key = iv.url;
                                                    const ur = rm.get(key);
                                                    if (ur && ur.result && ur.result.body) {
                                                        const data = ur.result.body;
                                                        const id = data.id;
                                                        const name = data.name;
                                                        const size = data.size;
                                                        const url = data.url;
                                                        iv.id = id;
                                                        iv.name = name;
                                                        iv.size = size;
                                                        iv.url = url;

                                                        item.value = BaseUtil.objectToJson(iv);
                                                    }
                                                }
                                            }

                                            const groupChatController: GroupChatController = app.appContext.getMaterial(GroupChatController);
                                            groupChatController.chat(groupId, content);
                                            inputArea.innerHTML = '';
                                            this.cacheData.data.html = '';

                                        }
                                    });
                                } else {
                                    const groupChatController: GroupChatController = app.appContext.getMaterial(GroupChatController);
                                    groupChatController.chat(groupId, content);
                                    inputArea.innerHTML = '';
                                    this.cacheData.data.html = '';
                                }
                            };
                            const wuh: ImageItemFileConverter = app.appContext.getObject(ImageItemFileConverter.name);
                            if (wuh) {
                                wuh.handleItems(items, handleItemsBack);
                            } else {
                                handleItemsBack(new Map<string, File>());
                            }
                        } catch (e) {
                            this.$Notice.warning({
                                title: '警告',
                                desc: '图片无法发送！',
                            });
                        }
                    }
                }
            }
        }

        private onSendFile(result: any, file: File) {

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

                item.value = BaseUtil.objectToJson(iv);
                section.items.push(item);

                const groupId = this.chatData.key;
                const groupChatController: GroupChatController = app.appContext.getMaterial(GroupChatController);
                groupChatController.chat(groupId, content);
            }
        }

        private handleScroll(e: Event) {
            const own = this;
            const target = e.target;
            if (target instanceof Element) {
                const node = target as Element;
                const height = node.scrollHeight;
                const top = node.scrollTop;

                const clientHeight = node.clientHeight;
                let position = '';

                const a = (height - top);
                const b = (clientHeight + 25);

                if (a < b) {
                    position = 'bottom';
                } else if (top === 0) {
                    position = 'top';
                } else {
                    position = 'middle';
                }
                own.cacheData.data.scrollHeight = height;
                own.cacheData.data.scrollTop = top;
                own.cacheData.data.scrollPosition = position;
            }
        }

        @Watch('messageInfo.list')
        private listChange(): void {
            // no
        }

        private loadHistory() {
            groupChatViewModel.loadHistory();
        }

        private getNickname(user: User): string {
            const service: GroupMemberService = app.appContext.getMaterial(GroupMemberService);
            const groupId = this.chatData.key;
            let nickname = '';
            if (user) {
                nickname = service.getUserShowName(groupId, user);
            }
            return nickname;
        }

        private handleShowList() {
            this.showList = !this.showList;
        }

        @Watch('chatData.key')
        private keyChange(): void {
            // no
            this.showList = false;
            this.showMore = false;

            const groupId = this.cacheData.key;
            const personalGroupMemberListBox: GroupMemberListOfPersonalBox = app.appContext.getMaterial(GroupMemberListOfPersonalBox);
            const position = personalGroupMemberListBox.getPosition(groupId);
            this.isOwner = (GroupMember.POSITION_OWNER === position);
        }

        private memberContextMenu(e: MouseEvent, user: User) {
            const groupId = this.chatData.key;
            const userId = user.id;
            const menuName = 'groupMemberContextMenu';
            const menu: any = this.$refs[menuName];
            menu.show(e, groupId, userId);
        }
    }
</script>

<style scoped>

</style>
