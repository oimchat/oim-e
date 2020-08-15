<template>
    <div class="oim-search-bar">
        <i class="oim-search-icon fas fa-search"></i>
        <input @keyup="onSearchChange" v-model="text" class="input-search compatible" type="text" placeholder="搜索">
        <i v-if="showPane" @click="clearSearch" class="oim-search-bar-close fas fa-times-circle"></i>
        <div :style="showPane?'display: block;':'display: none;'" class="only-popup recommendation" tabindex="-1">
            <div style="position: relative;">
                <div class="results"
                     style="margin-bottom: 0px; margin-right: 0px;overflow-y:auto">
                    <div class="result-list">
                        <div class="top-placeholder " style="height: 0px;"></div>
                        <div v-if="showUserList" class="">
                            <div class="result-title first">好友</div>
                            <template v-for="item of userList">
                                <ItemPane :data="item" :box="box"
                                          @on-selected="onUserSelected">
                                </ItemPane>
                            </template>
                        </div>

                        <div v-if="showGroupList" class="">
                            <div class="">
                                <div class="result-title">群组</div>
                            </div>
                            <template v-for="item of groupList">
                                <ItemPane :data="item" :box="box"
                                          @on-selected="onGroupSelected">
                                </ItemPane>
                            </template>
                        </div>

                        <div v-if="showFindUserList" class="">
                            <div class="result-title">查到的用户</div>
                            <div v-for="item of findUserList" class="find-item">
                                <ItemPane :data="item" :box="box"></ItemPane>
                                <div class="find-add">
                                    <a @click="handleShowUser(item.key)" href="javascript:void(0)">
                                        <i class="fa fa-address-card"></i>
                                    </a>
                                    <span style="margin-right: 5px">&nbsp;</span>
                                    <a @click="handleAddUser(item.key)" href="javascript:void(0)">
                                        <i class="fa fa-plus"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div v-if="showFindGroupList" class="">
                            <div class="result-title">查到的群</div>
                            <div v-for="item of findGroupList" class="find-item">
                                <ItemPane :data="item" :box="box"></ItemPane>
                                <div class="find-add">
                                    <a @click="handleShowGroup(item.key)" href="javascript:void(0)">
                                        <i class="fa fa-address-card"></i>
                                    </a>
                                    <span style="margin-right: 5px">&nbsp;</span>
                                    <a @click="handleJoinGroup(item.key)" href="javascript:void(0)">
                                        <i class="fa fa-plus"></i>
                                    </a>
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
        <Modal v-model="groupInfoShow"
               width="560"
               footer-hide
               class-name="vertical-center-modal"
        >
            <div :style="heightStyle">
                <group-info-card-pane :data="groupInfoCardMapper">
                </group-info-card-pane>
            </div>
        </Modal>

        <Modal v-model="userInfoShow"
               width="560"
               footer-hide
               class-name="vertical-center-modal"
        >
            <div :style="heightStyle">
                <user-info-card-pane :data="userInfoCardMapper">
                </user-info-card-pane>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import ItemPane from '@/views/common/list/ItemPane.vue';

    import GroupInfoCardPane from '@/views/module/group/card/GroupInfoCardPane.vue';
    import GroupInfoCardMapper from '@/views/module/group/card/GroupInfoCardMapper';

    import UserInfoCardPane from '@/views/module/user/card/UserInfoCardPane.vue';
    import UserInfoCardMapper from '@/views/module/user/card/UserInfoCardMapper';


    import JoinGroup from '@/views/module/group/find/GroupJoin.vue';
    import AddUser from '@/views/module/contact/apply/ContactAddApply.vue';

    import app from '@/app/App';
    import UserBox from '@/app/com/main/module/business/user/box/UserBox';
    import User from '@/app/com/main/module/business/user/bean/User';
    import Group from '@/app/com/main/module/business/group/bean/Group';
    import GroupBox from '@/app/com/main/module/business/group/box/GroupBox';
    import ItemData from '@/views/common/list/ItemData';
    import DataBackAction from '@/app/base/net/DataBackAction';
    import UserQuery from '@/app/com/main/module/business/user/data/UserQuery';
    import Page from '@/app/com/common/data/Page';
    import UserInfoController from '@/app/com/main/module/business/user/controller/UserInfoController';
    import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';
    import GroupInfoUtil from '@/app/com/main/common/util/GroupInfoUtil';
    import GroupQuery from '@/app/com/main/module/business/group/data/GroupQuery';
    import GroupInfoController from '@/app/com/main/module/business/group/controller/GroupInfoController';
    import ItemBox from '../common/list/ItemBox';


    @Component({
        components: {
            ItemPane,
            GroupInfoCardPane,
            UserInfoCardPane,
            JoinGroup,
            AddUser,
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


        private groupInfoCardMapper: GroupInfoCardMapper = new GroupInfoCardMapper();
        private userInfoCardMapper: UserInfoCardMapper = new UserInfoCardMapper();
        private userInfoShow: boolean = false;
        private groupInfoShow: boolean = false;

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
            const query: UserQuery = new UserQuery();
            const page: Page = new Page();

            page.size = 10;
            query.queryText = this.text;
            const uc: UserInfoController = app.appContext.getMaterial(UserInfoController);
            uc.queryList(query, page, (success, message, users) => {
                if (success) {
                    own.setFindUserList(users);
                }
            });
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
            uc.queryList(query, page, (success, message, groups) => {
                if (success) {
                    own.setFindGroupList(groups);
                }
            });
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
            if (user) {
                this.userInfoCardMapper.setUser(user);
                this.userInfoShow = true;
            }
        }

        private handleShowGroup(groupId: string) {
            const group = this.groupMap.get(groupId);
            if (group) {
                this.groupInfoCardMapper.setGroup(group);
                this.groupInfoShow = true;
            }
        }

        get heightStyle() {
            const clientHeight = document.body.clientHeight;
            const height = clientHeight - 100;
            return {height: height + 'px'};
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

    /************************
    search start
    *************************/

    .oim-search-bar {
        position: relative;
        width: 244px;
        margin: 0 auto 6px
    }

    .oim-search-icon {
        font-size: 18px;
        color: #8d9296;
        top: 7px;
        left: 5px;
    }

    .oim-search-bar .oim-search-icon {
        position: absolute;
        z-index: 101;
    }

    .oim-search-bar.focus .oim-search-icon {
        display: none
    }

    .oim-search-bar.focus .input-search {
        width: 230px;
        padding-left: 14px
    }

    .oim-search-bar .input-search {
        width: 214px;
        height: 32px;
        line-height: 32px;
        border: 0;
        border-radius: 2px;
        -moz-border-radius: 2px;
        -webkit-border-radius: 2px;

        background-color: #e4e5e7;
        color: #212020;
        padding-left: 30px;
        font-size: 12px
    }

    .oim-search-bar-close {
        display: block;
        width: 22px;
        height: 22px;
        //background: url(../images/chat/item_close.png) no-repeat;
        float: right;
        margin-right: 2px;
        margin-top: -20px;
        position: relative;
    }

    .input-search::-webkit-input-placeholder { /* WebKit browsers */
        color: #999;
    }

    .input-search:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #999;
    }

    .input-search::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #999;
    }

    .input-search:-ms-input-placeholder { /* Internet Explorer 10+ */
        color: #999;
    }

    .input-search::-webkit-input-placeholder {
        color: #999;
    }

    .result-list {
        height: 100%
    }

    .recommendation {
        background: #eeeeee;
        width: 244px;
        top: 36px;
        left: 0;
        box-shadow: 0 0 10px #2a2a2a;
        -moz-box-shadow: 0 0 10px #2a2a2a;
        -webkit-box-shadow: 0 0 10px #2a2a2a;
        border-radius: 2px;
        -moz-border-radius: 2px;
        -webkit-border-radius: 2px
    }

    .recommendation .results {
        max-height: 420px;
        overflow: hidden
    }

    .recommendation .result-item {
        overflow: hidden;
        cursor: pointer;
        border-bottom: 1px solid #33363b;
        background-color: #393c43
    }

    .recommendation .icon-list-item {
        height: 40px;
        padding: 5px 18px 5px;
    }


    .recommendation .result-item.on {
        background: #595b64
    }

    .recommendation .result-title {
        font-size: 14px;
        padding: 3px 9px;
        font-weight: 400;
        color: #444343;
        /*margin-top: 10px;*/
        background-color: #c6c6c6
    }

    .recommendation .avatar .img {
        display: block;
        width: 30px;
        height: 30px;
        border-radius: 5px
    }

    .recommendation .info {
        overflow: hidden;
        line-height: 30px
    }


    /************************
    search end
    *************************/

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
            color: #575656;

            :hover {
                color: #35a328;
            }
        }
    }

    .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal {
            top: 0;
        }
    }
</style>
