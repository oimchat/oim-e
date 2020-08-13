<template>
    <div class="main-page app-background-color">
        <div v-if="appInfo.disconnection" class="only-popup slide-down" tabindex="-1"
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
                                   :label="''">
                                <q-badge v-if="tab.redCount > 0" color="red" floating>{{tab.redCount}}</q-badge>
                            </q-tab>
                        </template>
                    </q-tabs>
                </div>
            </div>
            <div class="oim-main-nav-pane">
                <!--begin oim-main-personal-->
                <div class="oim-main-personal">
                    <div class="avatar">
                        <img class="img" :src="personalViewModel.personalData.avatar" alt="">
                    </div>
                    <div class="info">
                        <h3 class="nickname">
                            <span class="display-name">{{personalViewModel.personalData.name}}</span>
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
                        <q-tab-panel :name="tabs.messageTab.key">
                            <message-list-pane class="only-full-pane only-scrollbar-y">

                            </message-list-pane>
                        </q-tab-panel>

                        <q-tab-panel :name="tabs.contactTab.key">
                            <contact-list-pane
                                    class="only-full-pane only-scrollbar-y"
                                    @on-node-context-menu='onUserNodeContextMenu'
                                    @on-item-selected="onUserSelected"
                                    @on-item-context-menu='onUserItemContextMenu'
                            >
                            </contact-list-pane>
                        </q-tab-panel>

                        <q-tab-panel :name="tabs.groupTab.key">
                            <group-list-pane
                                    class="only-full-pane only-scrollbar-y"
                                    id="group-list-pane"
                                    @on-node-context-menu='onGroupNodeContextMenu'
                                    @on-item-selected="onGroupSelected"
                                    @on-item-context-menu='onGroupItemContextMenu'
                            >
                            </group-list-pane>

                        </q-tab-panel>
                        <q-tab-panel :name="tabs.moduleTab.key">
                            <div class="text-h4 q-mb-md">Movies</div>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque
                                magnam
                                odio
                                iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda
                                consectetur
                                culpa fuga nulla ullam. In, libero.</p>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque
                                magnam
                                odio
                                iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda
                                consectetur
                                culpa fuga nulla ullam. In, libero.</p>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque
                                magnam
                                odio
                                iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda
                                consectetur
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
                    <q-tab-panel :name="tabs.messageTab.key">
                        <MessageAreaPane></MessageAreaPane>
                    </q-tab-panel>

                    <q-tab-panel :name="tabs.contactTab.key">
                        <UserInfoPane ref="userInfoPane" @on-to-send="openUserChat"></UserInfoPane>
                    </q-tab-panel>

                    <q-tab-panel :name="tabs.groupTab.key">
                        <GroupInfoPane ref="groupInfoPane" @on-to-send="openGroupChat"></GroupInfoPane>
                    </q-tab-panel>
                    <q-tab-panel :name="tabs.moduleTab.key">
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
    import '../styles/oim/chat.css';


    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';

    import mainViewData from '@/platform/web/view/data/MainViewData';
    import mainBaseTabs from '@/platform/web/view/data/MainBaseTabs';

    import MainMenu from '@/views/main/MainMenu.vue';

    import SideBar from './main/SideBar.vue';
    import SearchBar from './main/SearchBar.vue';


    import ContactListPane from '@/views/module/contact/list/ContactListPane.vue';
    import MessageListPane from '@/views/module/message/MessageListPane.vue';
    import GroupListPane from './module/group/list/GroupListPane.vue';

    import GroupContextMenu from '@/views/module/group/menu/GroupItemContextMenu.vue';
    import UserItemContextMenu from '@/views/module/contact/menu/ContactItemContextMenu.vue';

    import GroupNodeContextMenu from '@/views/module/group/menu/GroupNodeContextMenu.vue';
    import UserNodeContextMenu from '@/views/module/contact/menu/ContactNodeContextMenu.vue';

    import UserInfoPane from './module/user/info/UserInfoPane.vue';
    import PersonalInfoPane from './main/pane/PersonalInfoPane.vue';
    import GroupInfoPane from './module/group/info/GroupInfoPane.vue';

    import MessageAreaPane from './main/message/MessageAreaPane.vue';
    import ModuleMenu from '@/views/main/ModuleMenu.vue';

    import DownloadFormPane from './main/message/chat/DownloadFormPane.vue';

    import SettingPane from '@/views/main/setting/SettingPane.vue';


    import ContextMenu from '@/views/common/menu/ContextMenu.vue';

    import app from '@/app/App';
    import personalViewModel from '@/platform/vue/view/model/PersonalViewModel';

    import ItemData from './common/list/ItemData';
    import MainView from '@/app/com/client/common/view/MainView';
    import Client from '@/app/base/message/client/Client';
    import ViewEnum from '@/app/com/client/common/view/ViewEnum';

    import NodeData from './common/list/NodeData';
    import LoginController from '@/app/com/main/module/business/index/controller/LoginController';
    import Prompt from '@/platform/web/common/Prompt';
    import UserChatViewController from '@/app/com/main/module/business/chat/controller/UserChatViewController';
    import GroupChatViewController from '@/app/com/main/module/business/chat/controller/GroupChatViewController';


    @Component({
        components: {
            ContactListPane,
            SideBar,
            MainMenu,
            SearchBar,
            MessageListPane,
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
    export default class Main extends Vue implements MainView {
        private data = mainViewData;
        private tabs = mainBaseTabs;
        private personalViewModel = personalViewModel;
        private appInfo = app;

        private isReconnect = false;

        // 声明周期钩子
        public mounted() {
            app.appContext.putViewObject(ViewEnum.MainView, this);
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
        }

        private searchOnGroupSelected(data: ItemData) {
            this.onGroupSelected(data);
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
            const controller: UserChatViewController = app.appContext.getMaterial(UserChatViewController);
            controller.showUserChatById(userId);
        }

        private openGroupChat(groupId: string) {
            const groupChatViewController: GroupChatViewController = app.appContext.getMaterial(GroupChatViewController);
            groupChatViewController.showGroupChatById(groupId);
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
        overflow: hidden;
    }

    .q-tab-panels {
        background: unset;
        height: 100%;
    }

    .scroll {
        overflow: hidden;
    }
</style>
