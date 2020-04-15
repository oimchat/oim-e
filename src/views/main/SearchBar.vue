<template>
    <div class="search_bar">
        <i class="oim_chat_search"></i>
        <input @keyup="onSearchChange" v-model="text" class="frm_search compatible" type="text" placeholder="搜索">
        <i v-if="showPane" @click="clearSearch" class="search_bar_close"></i>
        <div :style="showPane?'display: block;':'display: none;'" class="popup recommendation" tabindex="-1">
            <div style="position: relative;">
                <div class="contacts scrollbar-dynamic scroll-content"
                     style="margin-bottom: 0px; margin-right: 0px;overflow-y:auto">
                    <div class="contact_list ">
                        <div class="top-placeholder " style="height: 0px;"></div>
                        <div v-if="showUserList" class="">
                            <div class="">
                                <h4 class="contact_title first">好友</h4>
                            </div>
                            <div v-for="item of userList" class="">
                                <ItemPane :data="item" :box="box"
                                          @on-selected="onUserSelected"></ItemPane>
                            </div>
                        </div>

                        <div v-if="showGroupList" class="">
                            <div class="">
                                <h4 class="contact_title">群组</h4>
                            </div>
                            <div class="">
                                <div v-for="item of groupList" class="">
                                    <ItemPane :data="item" :box="box"
                                              @on-selected="onGroupSelected"></ItemPane>
                                </div>
                            </div>
                        </div>

                        <div v-if="showFindUserList" class="">
                            <div class="">
                                <h4 class="contact_title">查到的用户</h4>
                            </div>
                            <div class="">
                                <div class="">
                                    <div v-for="item of findUserList" class="find-item">
                                        <ItemPane :data="item" :box="box"></ItemPane>
                                        <div class="find-add">
                                            <a @click="handleShowUser(item.key)" href="javascript:void(0)">
                                                <i class="fa fa-address-card"></i>
                                            </a>
                                            <span>&nbsp;</span>
                                            <a @click="handleAddUser(item.key)" href="javascript:void(0)">
                                                <i class="fa fa-plus"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="showFindGroupList" class="">
                            <div class="">
                                <h4 class="contact_title">查到的群</h4>
                            </div>
                            <div class="">
                                <div class="">
                                    <div v-for="item of findGroupList" class="find-item">
                                        <ItemPane :data="item" :box="box"></ItemPane>
                                        <div class="find-add">
                                            <a @click="handleShowGroup(item.key)" href="javascript:void(0)">
                                                <i class="fa fa-address-card"></i>
                                            </a>
                                            <span>&nbsp;</span>
                                            <a @click="handleJoinGroup(item.key)" href="javascript:void(0)">
                                                <i class="fa fa-plus"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bottom-placeholder"></div>
                    </div>
                </div>
            </div>
        </div>
        <AddUser ref="addUserView"></AddUser>
        <JoinGroup ref="joinGroupView"></JoinGroup>

        <GroupInfoCard ref="groupInfoCardView"></GroupInfoCard>
        <UserInfoCard ref="userInfoCardView"></UserInfoCard>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import ItemPane from '@/views/common/list/ItemPane.vue';
    import GroupInfoCard from '@/views/main/card/GroupInfoCard.vue';
    import UserInfoCard from '@/views/main/card/UserInfoCard.vue';

    import JoinGroup from '@/views/find/JoinGroup.vue';
    import AddUser from '@/views/find/AddUser.vue';

    import app from '@/app/App';
    import UserBox from '@/app/com/main/box/UserBox';
    import User from '@/app/com/bean/User';
    import Group from '@/app/com/bean/Group';
    import GroupBox from '@/app/com/main/box/GroupBox';
    import ItemData from '@/views/common/list/ItemData';
    import DataBackAction from '@/app/base/net/DataBackAction';
    import UserQuery from '@/app/com/data/UserQuery';
    import Page from '@/app/com/data/common/Page';
    import UserController from '@/app/com/main/controller/UserController';
    import UserInfoUtil from '@/app/com/main/util/UserInfoUtil';
    import GroupInfoUtil from '@/app/com/main/util/GroupInfoUtil';
    import GroupQuery from '@/app/com/data/GroupQuery';
    import GroupInfoController from '@/app/com/main/controller/GroupInfoController';
    import ItemBox from '../common/list/ItemBox';

    @Component({
        components: {
            ItemPane,
            JoinGroup,
            AddUser,
            UserInfoCard,
            GroupInfoCard,
        },
    })
    export default class SearchBar extends Vue {
        private box: ItemBox = new ItemBox();
        private text: string = '';
        private showPane: boolean = false;

        private showUserList: boolean = false;
        private showGroupList: boolean = false;

        private userList: ItemData[] = [];
        private groupList: ItemData[] = [];

        private showFindUserList: boolean = false;
        private showFindGroupList: boolean = false;

        private findUserList: ItemData[] = [];
        private findGroupList: ItemData[] = [];

        private userMap: Map<string, User> = new Map<string, User>();
        private groupMap: Map<string, Group> = new Map<string, Group>();

        public onSearchChange(): void {
            const t = this.text;
            if (this.text !== '') {
                this.showPane = true;
                this.searchUser();
                this.searchGroup();
                this.queryUserList();
                this.queryGroupList();
            } else {
                this.showPane = false;
            }
        }

        private clearSearch() {
            this.text = '';
            this.showPane = false;
        }

        private searchUser() {
            const showList: ItemData[] = [];
            const box: UserBox = app.appContext.getMaterial(UserBox);
            const list: User[] = box.findUserList(this.text);
            if (list) {
                for (const data of list) {
                    const item: ItemData = new ItemData();
                    item.key = data.id;
                    item.name = data.nickname;
                    item.avatar = data.avatar;
                    showList.push(item);
                }
            }
            this.userList = showList;
            this.showUserList = showList.length > 0;
        }

        private searchGroup() {
            const showList: ItemData[] = [];
            const box: GroupBox = app.appContext.getMaterial(GroupBox);
            const list: Group[] = box.findGroupList(this.text);
            if (list) {
                for (const data of list) {
                    GroupInfoUtil.getShowName(data);
                    const item: ItemData = new ItemData();
                    item.key = data.id;
                    item.name = data.name;
                    item.avatar = data.avatar;
                    item.gray = false;
                    showList.push(item);
                }
            }
            this.groupList = showList;
            this.showGroupList = showList.length > 0;
        }

        private queryUserList(): void {
            this.findUserList = [];
            if (this.userList.length > 0) {
                return;
            }
            const own = this;
            const back: DataBackAction = {
                back(data: any): void {
                    if (data) {
                        const info = data.info;
                        if (info) {
                            if (info.success && data.body) {
                                const list: User[] = data.body.items;
                                own.setFindUserList(list);
                            }
                        }
                    }
                },
                lost(data: any): void {
                    // no
                },
                timeOut(data: any): void {
                    // no
                },
            } as DataBackAction;

            const query: UserQuery = new UserQuery();
            const page: Page = new Page();

            page.size = 10;
            query.queryText = this.text;
            const uc: UserController = app.appContext.getMaterial(UserController);
            uc.queryUserList(query, page, back);
        }

        private setFindUserList(list: User[]) {
            if (!list) {
                list = [];
            }
            for (const user of list) {
                UserInfoUtil.handleAvatar(user);
            }
            this.userMap.clear();
            if (list) {
                for (const data of list) {
                    const id = data.id;
                    const item: ItemData = new ItemData();
                    item.key = data.id;
                    item.name = data.nickname;
                    item.avatar = data.avatar;
                    this.findUserList.push(item);
                    this.userMap.set(id, data);
                }
            }
            this.showFindUserList = list.length > 0;
        }

        private queryGroupList(): void {
            this.findGroupList = [];
            if (this.findGroupList.length > 0) {
                return;
            }
            const own = this;
            const back: DataBackAction = {
                back(data: any): void {
                    if (data) {
                        const info = data.info;
                        if (info) {
                            if (info.success && data.body) {
                                const list: Group[] = data.body.items;
                                own.setFindGroupList(list);
                            }
                        }
                    }
                },
                lost(data: any): void {
                    // no
                },
                timeOut(data: any): void {
                    // no
                },
            } as DataBackAction;

            const query: GroupQuery = new GroupQuery();
            const page: Page = new Page();

            page.size = 10;
            query.queryText = this.text;
            const uc: GroupInfoController = app.appContext.getMaterial(GroupInfoController);
            uc.queryGroupList(query, page, back);
        }

        private setFindGroupList(list: Group[]) {
            if (!list) {
                list = [];
            }
            for (const group of list) {
                GroupInfoUtil.handleAvatar(group);
            }
            const box: GroupBox = app.appContext.getMaterial(GroupBox);
            this.groupMap.clear();
            if (list) {
                for (const data of list) {
                    const id = data.id;
                    const item: ItemData = new ItemData();
                    item.key = data.id;
                    item.name = data.name;
                    item.avatar = data.avatar;
                    item.gray = false;
                    this.findGroupList.push(item);
                    this.groupMap.set(id, data);
                }
            }
            this.showFindGroupList = list.length > 0;
        }

        private handleAddUser(userId: string) {
            const addUserViewName = 'addUserView';
            const addUserView: any = this.$refs[addUserViewName];
            addUserView.setUserId(userId);
            addUserView.setShow(true);
        }

        private handleJoinGroup(groupId: string) {
            const joinGroupViewName = 'joinGroupView';
            const joinGroupView: any = this.$refs[joinGroupViewName];
            joinGroupView.setGroupId(groupId);
            joinGroupView.setShow(true);
        }


        private handleShowUser(userId: string) {
            const user = this.userMap.get(userId);
            const userInfoCardName = 'userInfoCardView';
            const userInfoCardView: any = this.$refs[userInfoCardName];
            userInfoCardView.setUser(user);
            // userInfoCardView.setUserId(userId);
            userInfoCardView.setShow(true);
        }

        private handleShowGroup(groupId: string) {
            const group = this.groupMap.get(groupId);
            const groupInfoCardViewName = 'groupInfoCardView';
            const groupInfoCardView: any = this.$refs[groupInfoCardViewName];
            // groupInfoCardView.setGroupId(groupId);
            groupInfoCardView.setGroup(group);
            groupInfoCardView.setShow(true);
        }

        @Emit('on-user-selected')
        private onUserSelected(data: ItemData) {
            // TODO
        }

        @Emit('on-group-selected')
        private onGroupSelected(data: ItemData) {
            // TODO
        }
    }
</script>

<style lang="scss">
    .find-item {
        position: relative;
    }

    .find-add {
        position: absolute;
        padding-top: 5px;
        top: 0;
        width: 20%;
        height: 100%;
        z-index: 2;
        right: 0;
        color: white;
        font-size: 20px;
        vertical-align: middle;

        a {
            color: white;

            :hover {
                color: #35a328;
            }
        }
    }
</style>
