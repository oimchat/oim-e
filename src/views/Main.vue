<template>
    <div class="main-page">
        <div v-if="appInfo.disconnection" class="popup slide-down" tabindex="-1"
             style="width: 100%;text-align: center;bottom: 1px;position: fixed;top: unset;">
            <span style="color: #ffad33">网络已断开</span>
            <button v-show="!isReconnect" @click="reconnect" class="oim_button"
                    style="height: 25px;width: 70px;font-size: 12px">重连
            </button>
        </div>
        <div class="main-inner">
            <div class="oim-sidebar">
                <div class="oim-sidebar-tab">
                    <q-tabs
                            v-model="data.tab"
                            vertical
                            switch-indicator
                            active-color="white"
                            class="text-grey-5"
                    >
                        <template v-for="tab in data.tabs">
                            <q-tab :name="tab.key"
                                   :icon="tab.icon"
                                   @input="tab.doOnSelected()"
                                   :label="' '"/>
                        </template>
                    </q-tabs>
                </div>
            </div>
            <div class="oim-main-nav-pane">
                <!--begin oim-main-personal-->
                <div class="oim-main-personal">
                    <div class="avatar">
                        <img class="img" :src="personalData.avatar" alt="">
                    </div>
                    <div class="info">
                        <h3 class="nickname">
                            <span class="display-name">{{personalData.name}}</span>
                            <a id="main-down-menu" @click="onDownMenu($event,$root)" class="option" href="javascript:;">
                                <i class="fas fa-bars"></i>
                            </a>
                        </h3>
                    </div>
                </div>
                <SearchBar @on-user-selected="searchOnUserSelected"
                           @on-group-selected="searchOnGroupSelected">
                </SearchBar>
                <!--end oim-main-personal-->
                <!--begin tab-->
                <div style="padding-bottom: 16px;">
                </div>
                <!--end tab-->
                <div class="oim-main-list-pane">
                    <q-tab-panels
                            v-model="data.tab"
                            animated
                            transition-prev="jump-up"
                            transition-next="jump-up"
                    >
                        <q-tab-panel name="message_tab">
                            <message-list-pane>

                            </message-list-pane>
                        </q-tab-panel>

                        <q-tab-panel name="user_tab">
                            <contact-list-pane
                                    @on-node-context-menu='onUserNodeContextMenu'
                                    @on-item-selected="onUserSelected"
                                    @on-item-context-menu='onUserItemContextMenu'
                            >
                            </contact-list-pane>
                        </q-tab-panel>

                        <q-tab-panel name="group_tab">
                            <group-list-pane
                                    id="group-list-pane"
                                    @on-node-context-menu='onGroupNodeContextMenu'
                                    @on-item-selected="onGroupSelected"
                                    @on-item-context-menu='onGroupItemContextMenu'
                            >
                            </group-list-pane>

                        </q-tab-panel>
                        <q-tab-panel name="module_tab">
                            <div class="text-h4 q-mb-md">Movies</div>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam
                                odio
                                iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur
                                culpa fuga nulla ullam. In, libero.</p>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam
                                odio
                                iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur
                                culpa fuga nulla ullam. In, libero.</p>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam
                                odio
                                iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur
                                culpa fuga nulla ullam. In, libero.</p>
                        </q-tab-panel>
                    </q-tab-panels>
                </div>
            </div>
            <div class="oim-main-container-pane">
                <q-tab-panels
                        v-model="data.tab"
                        animated
                        transition-prev="jump-up"
                        transition-next="jump-up"
                >
                    <q-tab-panel name="message_tab">
                        <MessageAreaPane></MessageAreaPane>
                    </q-tab-panel>

                    <q-tab-panel name="user_tab">
                        <UserInfoPane ref="userInfoPane" @on-to-send="openUserChat"></UserInfoPane>
                    </q-tab-panel>

                    <q-tab-panel name="group_tab">
                        <GroupInfoPane ref="groupInfoPane" @on-to-send="openGroupChat"></GroupInfoPane>
                    </q-tab-panel>
                    <q-tab-panel name="module_tab">
                        <div class="box chat">
                            <router-view></router-view>
                        </div>
                    </q-tab-panel>
                </q-tab-panels>
            </div>
        </div>
        <MainMenu></MainMenu>

        <UserItemContextMenu ref='userContextMenu'></UserItemContextMenu>
        <GroupContextMenu ref='groupContextMenu'></GroupContextMenu>

        <GroupNodeContextMenu ref='groupNodeContextMenu'></GroupNodeContextMenu>
        <UserNodeContextMenu ref='userNodeContextMenu'></UserNodeContextMenu>
    </div>
</template>

<script lang="ts">
    import '../styles/layout.css';
    import '../styles/oim/main.scss';
    import '../styles/oim/common.css';
    import '../styles/oim/component.scss';


    // import '../styles/lib/font-awesome/4.7.0/css/font-awesome.min.css';
    // import '../styles/chat.css';
    // import '../styles/component.scss';


    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';

    import mainViewData from '@/platform/web/view/data/MainViewData';

    import SoundHandlerPane from '@/views/main/SoundHandlerPane.vue';
    import MainMenu from '@/views/main/MainMenu.vue';

    import SideBar from './main/SideBar.vue';
    import SearchBar from './main/SearchBar.vue';


    import ContactListPane from '@/views/module/contact/list/ContactListPane.vue';
    import MessageListPane from '@/views/module/message/MessageListPane.vue';
    import UserListPane from './main/list/UserListPane.vue';
    import GroupListPane from './module/group/list/GroupListPane.vue';

    import GroupContextMenu from '@/views/module/group/menu/GroupContextMenu.vue';
    import UserItemContextMenu from '@/views/main/list/UserItemContextMenu.vue';

    import GroupNodeContextMenu from '@/views/module/group/menu/GroupNodeContextMenu.vue';
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
    import NodeData from './common/list/NodeData';
    import GroupMemberListController from '@/app/com/main/controller/GroupMemberListController';
    import LoginController from '@/app/com/main/controller/LoginController';
    import Prompt from '@/platform/web/common/Prompt';


    @Component({
        components: {
            ContactListPane,
            SoundHandlerPane,
            SideBar,
            MainMenu,
            SearchBar,
            MessageListPane,
            UserListPane,
            GroupListPane,
            GroupContextMenu,
            UserItemContextMenu,
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
        private data = mainViewData;
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
            mainViewData.initialize();
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
    .q-tab-panel {
        padding: 0;
    }

    .q-tab-panels {
        background: unset;
        height: 100%;
    }
</style>
