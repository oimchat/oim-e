<template>
    <div class="main">
        <div v-if="appInfo.disconnection" class="popup slide-down" tabindex="-1"
             style="width: 100%;text-align: center;bottom: 1px;position: fixed;top: unset;">
            <span style="color: #ffad33">网络已断开</span>
            <button v-show="!isReconnect" @click="reconnect" class="oim_button"
                    style="height: 25px;width: 70px;font-size: 12px">重连
            </button>
        </div>
        <div class="main_inner">
            <SideBar :tabs="sideTabInfos" :box="sideTabBox" @on-tab-selected="onTabSelected"
                     @on-button-click="handleSystemSetting"></SideBar>
            <!--begin panel-->
            <div class="panel">
                <!--begin header-->
                <div class="header">
                    <div class="avatar">
                        <img class="img" :src="personalData.avatar" alt="">
                    </div>
                    <div class="info">
                        <h3 class="nickname">
                            <span class="display_name">{{personalData.name}}</span>
                            <a @click="onDownMenu($event,$root)" class="opt" href="javascript:;"><i
                                    class="oim_chat_add"></i></a>
                        </h3>
                    </div>
                </div>
                <!--end header-->
                <!--begin search-->
                <SearchBar @on-user-selected="searchOnUserSelected"
                           @on-group-selected="searchOnGroupSelected"></SearchBar>
                <!--end search-->
                <!--begin tab-->
                <div class="tab" style="padding-bottom: 16px;">
                </div>
                <!--end tab-->

                <!--begin nav view-->
                <!-- uiView: navView -->
                <div class="nav_view" style="visibility: visible; width: auto;">
                    <div v-show="currentTab=='message_tab'" style="height: 100%">
                        <MessageListPane></MessageListPane>
                    </div>
                    <div v-show="currentTab=='user_tab'" style="height: 100%">
                        <UserListPane
                                @on-node-context-menu='onUserNodeContextMenu'
                                @on-item-selected="onUserSelected"
                                @on-item-context-menu='onUserItemContextMenu'>

                        </UserListPane>
                    </div>
                    <div v-show="currentTab=='group_tab'" style="height: 100%">
                        <GroupListPane
                                @on-node-context-menu='onGroupNodeContextMenu'
                                @on-item-selected="onGroupSelected"
                                @on-item-context-menu='onGroupItemContextMenu'>

                        </GroupListPane>
                    </div>
                    <div v-show="currentTab=='module_tab'" style="height: 100%">
                        <ModuleMenu></ModuleMenu>
                    </div>
                </div>
                <!--end nav view-->

            </div>
            <!--end panel-->
            <!--begin chat-->
            <!-- uiView: contentView -->
            <div style="height:100%; padding-top: 25px;background-color: rgba(250,250,250,0.6);" class="">
                <div v-show="currentTab=='message_tab'" style="height: 100%">
                    <MessageAreaPane></MessageAreaPane>
                </div>
                <div v-show="currentTab=='user_tab'" style="height: 100%">
                    <UserInfoPane ref="userInfoPane" @on-to-send="openUserChat"></UserInfoPane>
                </div>
                <div v-show="currentTab=='group_tab'" style="height: 100%">
                    <GroupInfoPane ref="groupInfoPane" @on-to-send="openGroupChat"></GroupInfoPane>
                </div>
                <div v-show="currentTab=='module_tab'" style="height: 100%">
                    <div class="box chat">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
            <!--end chat-->
        </div>

        <MainMenu></MainMenu>
        <GroupContextMenu ref='groupContextMenu'></GroupContextMenu>
        <UserContextMenu ref='userContextMenu'></UserContextMenu>

        <GroupNodeContextMenu ref='groupNodeContextMenu'></GroupNodeContextMenu>
        <UserNodeContextMenu ref='userNodeContextMenu'></UserNodeContextMenu>

        <SoundHandlerPane></SoundHandlerPane>
        <DownloadFormPane></DownloadFormPane>
        <SettingPane ref="settingPane"></SettingPane>
    </div>
</template>

<script lang="ts">
    import '../styles/layout.css';
    import '../styles/lib/font-awesome/4.7.0/css/font-awesome.min.css';
    import '../styles/chat.css';
    import '../styles/component.css';
    import '../styles/main.css';

    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';

    import SoundHandlerPane from '@/views/main/SoundHandlerPane.vue';
    import MainMenu from '@/views/main/MainMenu.vue';

    import SideBar from './main/SideBar.vue';
    import SearchBar from './main/SearchBar.vue';

    import MessageListPane from './main/list/MessageListPane.vue';
    import UserListPane from './main/list/UserListPane.vue';
    import GroupListPane from './main/list/GroupListPane.vue';

    import GroupContextMenu from '@/views/main/list/GroupContextMenu.vue';
    import UserContextMenu from '@/views/main/list/UserContextMenu.vue';

    import GroupNodeContextMenu from '@/views/main/list/GroupNodeContextMenu.vue';
    import UserNodeContextMenu from '@/views/main/list/UserNodeContextMenu.vue';

    import UserInfoPane from './main/pane/UserInfoPane.vue';
    import PersonalInfoPane from './main/pane/PersonalInfoPane.vue';
    import GroupInfoPane from './main/pane/GroupInfoPane.vue';

    import MessageAreaPane from './main/message/MessageAreaPane.vue';
    import ModuleMenu from '@/views/main/ModuleMenu.vue';

    import DownloadFormPane from './main/message/chat/DownloadFormPane.vue';

    import SettingPane from '@/views/main/setting/SettingPane.vue';


    import SideTabData from './main/SideTabData';

    import ContextMenu from '@/views/common/menu/ContextMenu.vue';

    import app from '@/app/App';
    import personalDataBox from '@/impl/PersonalDataBox';


    import PersonalData from './common/data/PersonalData';
    import SideTabBox from './main/SideTabBox';
    import ItemData from './common/list/ItemData';
    import MainView from '@/app/com/main/view/MainView';
    import Client from '@/app/base/message/client/Client';
    import ViewEnum from '@/app/com/main/view/ViewEnum';


    import UserChatInfoService from '@/app/com/main/service/UserChatInfoService';
    import UserChatItemService from '@/app/com/main/service/UserChatItemService';
    import UserChatItemController from '@/app/com/main/controller/UserChatItemController';
    import MessageAllUnreadView from '@/app/com/main/view/MessageAllUnreadView';
    import GroupChatInfoService from '@/app/com/main/service/GroupChatInfoService';
    import GroupChatItemController from '@/app/com/main/controller/GroupChatItemController';
    import Platform from '@/app/common/util/Platform';
    import NodeData from './common/list/NodeData';
    import GroupMemberListController from '@/app/com/main/controller/GroupMemberListController';
    import LoginController from '@/app/com/main/controller/LoginController';
    import Prompt from '@/platform/web/common/Prompt';


    @Component({
        components: {
            SoundHandlerPane,
            SideBar,
            MainMenu,
            SearchBar,
            MessageListPane,
            UserListPane,
            GroupListPane,
            GroupContextMenu,
            UserContextMenu,
            GroupNodeContextMenu,
            UserNodeContextMenu,
            PersonalInfoPane,
            UserInfoPane,
            GroupInfoPane,
            MessageAreaPane,
            ModuleMenu,
            ContextMenu,
            DownloadFormPane,
            SettingPane,
        },
    })
    export default class Main extends Vue implements MainView, MessageAllUnreadView {
        private personalData: PersonalData = personalDataBox.personalData;
        private currentTab: string = '';
        private sideTabInfos: SideTabData[] = new Array<SideTabData>();
        private sideTabBox: SideTabBox = new SideTabBox();
        private appInfo = app;

        private isReconnect = false;

        // 声明周期钩子
        public mounted() {
            app.appContext.putViewObject(ViewEnum.MainView, this);
            app.appContext.putViewObject(ViewEnum.MessageAllUnreadView, this);
            this.init();
        }

        public showOtherOnline(offline: boolean, client: Client): void {
            if (offline) {
                this.logout();
                this.$Modal.confirm({
                    title: '信息',
                    content: '您的账号在其他地方登录！',
                    onOk: () => {
                        // no
                    },
                });
            }
        }

        public showTab(key: string): void {
            this.selectedTab(key);
        }

        public setItemRed(type: string, red: boolean, count: number): void {
            count = (count > 99) ? 99 : count;
            for (const data of this.sideTabInfos) {
                if (data.key === type) {
                    data.red = red;
                    data.redCount = count;
                    break;
                }
            }
        }

        public isItemShowing(type: string): boolean {
            return this.currentTab === type;
        }

        private init(): void {
            this.initTabs();
            this.initializePersonal();
        }

        private initializePersonal(): void {
            //
        }

        private initTabs(): void {
            const onTabSelected: (data: SideTabData) => void = (d: SideTabData) => {
                if (d) {
                    const key = d.key;
                    this.onTabSelected(key);
                }
            };

            let data: SideTabData = new SideTabData();
            data.key = 'message_tab';
            data.normalImage = 'assets/images/main/tab/message_normal.png';
            data.selectedImage = 'assets/images/main/tab/message_selected.png';
            data.selected = true;
            // data.red = true;
            // data.redCount = 22;
            data.setOnSelected(onTabSelected);
            this.sideTabInfos.push(data);

            data = new SideTabData();
            data.key = 'user_tab';
            data.normalImage = 'assets/images/main/tab/user_normal.png';
            data.selectedImage = 'assets/images/main/tab/user_selected.png';
            data.image = data.normalImage;
            data.setOnSelected(onTabSelected);
            this.sideTabInfos.push(data);

            data = new SideTabData();
            data.key = 'group_tab';
            data.normalImage = 'assets/images/main/tab/group_normal.png';
            data.selectedImage = 'assets/images/main/tab/group_selected.png';
            data.image = data.normalImage;
            data.setOnSelected(onTabSelected);
            this.sideTabInfos.push(data);

            data = new SideTabData();
            data.key = 'module_tab';
            data.normalImage = 'assets/images/main/tab/app_normal.png';
            data.selectedImage = 'assets/images/main/tab/app_selected.png';
            data.image = data.normalImage;
            data.setOnSelected(onTabSelected);
            this.sideTabInfos.push(data);
        }

        private selectedTab(key: string): void {
            if (this.currentTab === key) {
                return;
            }
            for (const data of this.sideTabInfos) {
                if (data.key === key) {
                    this.sideTabBox.select(data);
                    break;
                }
            }
        }

        private onTabSelected(key: string): void {
            this.currentTab = key;
        }

        private onDownMenu(e: MouseEvent, root: Vue): void {
            this.openMenu(e, root, 'mainDownMenu');
        }

        private logout(): void {
            this.$store.commit('logout');
            this.$router.push({path: '/login'});
        }

        private openMenu(e: MouseEvent, root: Vue, n?: string) {
            e.stopPropagation();
            e.preventDefault();
            root.$emit('openOnlyContextMenu', {
                name: n,
                x: e.clientX,
                y: e.clientY,
            });
        }

        private searchOnUserSelected(data: ItemData) {
            this.onUserSelected(data);
            this.selectedTab('user_tab');
        }

        private searchOnGroupSelected(data: ItemData) {
            this.onGroupSelected(data);
            this.selectedTab('group_tab');
        }

        private onUserSelected(data: ItemData) {
            if (data) {
                const userId = data.key;
                const userInfoPaneName = 'userInfoPane';
                const userInfoPane: any = this.$refs[userInfoPaneName];
                userInfoPane.setUserId(userId);
            }
        }

        private onGroupSelected(data: ItemData) {
            if (data) {
                const groupId = data.key;
                const groupInfoPaneName = 'groupInfoPane';
                const groupInfoPane: any = this.$refs[groupInfoPaneName];
                groupInfoPane.setGroupId(groupId);

                const groupMemberListController: GroupMemberListController = app.appContext.getMaterial(GroupMemberListController);
                groupMemberListController.loadMemberListByGroupId(groupId);
            }
        }

        private onGroupItemContextMenu(e: MouseEvent, data: ItemData) {
            if (data) {
                const groupId = data.key;
                const groupContextMenuName = 'groupContextMenu';
                const groupContextMenu: any = this.$refs[groupContextMenuName];
                groupContextMenu.show(e, groupId);
            }
        }

        private onUserItemContextMenu(e: MouseEvent, data: ItemData) {
            if (data) {
                const userId = data.key;
                const menuName = 'userContextMenu';
                const menu: any = this.$refs[menuName];
                menu.show(e, userId);
            }
        }


        private onGroupNodeContextMenu(e: MouseEvent, data: NodeData) {
            if (data) {
                const id = data.key;
                const menuName = 'groupNodeContextMenu';
                const menu: any = this.$refs[menuName];
                menu.show(e, id);
            }
        }

        private onUserNodeContextMenu(e: MouseEvent, data: ItemData) {
            if (data) {
                const id = data.key;
                const menuName = 'userNodeContextMenu';
                const menu: any = this.$refs[menuName];
                menu.show(e, id);
            }
        }

        private openUserChat(userId: string) {
            this.selectedTab('message_tab');
            const userChatService: UserChatInfoService = app.appContext.getMaterial(UserChatInfoService);
            const userChatItemController: UserChatItemController = app.appContext.getMaterial(UserChatItemController);

            userChatService.showUserChatById(userId);
            userChatItemController.showUserChatItemById(userId);
        }

        private openGroupChat(groupId: string) {
            this.selectedTab('message_tab');
            const groupChatInfoService: GroupChatInfoService = app.appContext.getMaterial(GroupChatInfoService);
            const groupChatItemController: GroupChatItemController = app.appContext.getMaterial(GroupChatItemController);
            const groupMemberListController: GroupMemberListController = app.appContext.getMaterial(GroupMemberListController);

            groupChatInfoService.showGroupChatById(groupId);
            groupChatItemController.showGroupChatItemById(groupId);
            groupMemberListController.loadMemberListByGroupId(groupId);
        }


        private handleSystemSetting() {
            const viewName = 'settingPane';
            const view: any = this.$refs[viewName];
            view.setShow(true);

            // const text = Platform.getName(); // navigator.userAgent.toLowerCase();
            // this.$Modal.confirm({
            //     title: 'System',
            //     content: text,
            //     onOk: () => {
            //         // no
            //     },
            //     onCancel: () => {
            //         // no
            //     },
            // });
        }

        private reconnect() {
            this.isReconnect = true;
            const back = (success: boolean, message?: string) => {
                if (!success) {
                    if (message) {
                        Prompt.notice(message);
                    }
                }
                this.isReconnect = false;
            };
            const lc: LoginController = app.appContext.getMaterial(LoginController);
            lc.reconnect(back);
        }
    }
</script>

<style scoped>

</style>
