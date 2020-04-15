<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                邀请列表
            </p>
            <span slot="extra" @click="handleLoadList">
                <Button type="primary" icon="search">刷新</Button>
            </span>
            <Row>
                <div class="apply-notice-message-page" style="overflow-y:auto;max-height:350px">
                    <div v-for='item in list' class="apply-notice-message-item">
                        <div class="data">
                            <div class="content">
                                <div class='avatar'>
                                    <Avatar :src="item.inviterUser.avatar" size="large"
                                            :title="item.inviterUser.nickname"></Avatar>
                                    <span style="margin-left: 10px" :title="item.inviterUser.account"
                                          class="nickname_text">{{item.inviterUser.account}}</span>
                                </div>
                                <div class="info">
                                    <h3 class="nickname">
                                    <span :title="item.inviterUser.nickname"
                                          class="nickname_text">{{item.inviterUser.nickname}}</span>
                                    </h3>
                                    <p class="msg" style='height: 25px'>
                                        <span class="">{{item.inviterUser.signature}}</span>
                                    </p>
                                </div>
                            </div>

                            <div class="content">
                                <p class="msg" style='height: 12px'>
                                    <span class="">邀请</span>
                                </p>
                                <p class="msg" style='height: 12px'>
                                    <span class="">您加入</span>
                                </p>
                            </div>

                            <div class="content">
                                <div class='avatar'>
                                    <Avatar :src="item.group.avatar" size="large" :title="item.group.nickname"></Avatar>
                                    <span style="margin-left: 10px" :title="item.group.number"
                                          class="nickname_text">{{item.group.number}}</span>
                                </div>
                                <div class="info">
                                    <h3 class="nickname">
                                        <span :title="item.group.name" class="nickname_text">{{item.group.name}}</span>
                                    </h3>
                                    <p class="msg" style='height: 25px'>
                                        <span class="">{{item.group.introduce}}</span>
                                    </p>
                                </div>
                            </div>

                            <div class="handle-pane">
                                <Row v-if="item.apply.inviteeHandleType==='0'">
                                    <Button @click="reject(item.apply)" type="primary" icon="ios-add-circle">拒绝</Button>
                                    <Button @click="accept(item.apply)" type="primary" icon="ios-add-circle">同意</Button>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </Row>
        </Card>
        <Card>
            <Row>
                <Page :current.sync="page.number"
                      :page-size="page.size"
                      :total.sync="page.totalCount"
                      @on-change="handlePage"
                      @on-page-size-change='handlePageSize'
                      show-elevator show-sizer>
                </Page>
            </Row>
        </Card>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';

    import app from '@/app/App';
    import GroupJoinController from '@/app/com/main/controller/GroupJoinController';
    import GroupJoinApply from '@/app/com/bean/GroupJoinApply';
    import Page from '@/app/com/data/common/Page';
    import DataBackAction from '@/app/base/net/DataBackAction';
    import Prompt from '@/component/common/Prompt';
    import UserInfoUtil from '@/app/com/main/util/UserInfoUtil';
    import User from '@/app/com/bean/User';
    import GroupJoinHandleData from '@/app/com/data/GroupJoinHandleData';
    import GroupJoinApplyDetail from '@/app/com/data/GroupJoinApplyDetail';
    import GroupJoinApplyQuery from '@/app/com/data/GroupJoinApplyQuery';
    import GroupInviteController from '@/app/com/main/controller/GroupInviteController';
    import GroupInviteApplyQuery from '@/app/com/data/GroupInviteApplyQuery';
    import GroupInviteApply from '@/app/com/bean/GroupInviteApply';
    import GroupInviteVerifyHandleData from '@/app/com/data/GroupInviteVerifyHandleData';
    import GroupBox from '@/app/com/main/box/GroupBox';
    import Group from '@/app/com/bean/Group';
    import GroupInfoUtil from '@/app/com/main/util/GroupInfoUtil';
    import GroupInviteeApplyQuery from '@/app/com/data/GroupInviteeApplyQuery';
    import GroupInviteeHandleData from '@/app/com/data/GroupInviteeHandleData';

    @Component({
        components: {},
    })
    export default class GroupInviteeJoinNoticePane extends Vue {

        private list: any[] = [];
        private page: Page = new Page();

        public mounted() {
            this.loadList();
        }

        @Watch('$route')
        private onChangeRoute(): void {
            this.loadList();
        }

        private handlePage(value: number): void {
            const own = this;
            own.page.number = value;
            this.loadList();
        }

        private handlePageSize(value: number): void {
            const own = this;
            own.page.size = value;
            this.loadList();
        }

        private handleLoadList(): void {
            const own = this;
            own.page.number = 1;
            this.loadList();
        }

        private loadList(): void {
            const own = this;
            const back: DataBackAction = {
                back(data: any): void {
                    if (data) {
                        const info = data.info;
                        if (info) {
                            if (info.success && data.body) {
                                const list: any[] = data.body.items;
                                const p: Page = data.body.page;
                                own.setList(list, p);
                            }
                        }
                    }
                },
                lost(data: any): void {
                    Prompt.notice('请求失败！');
                },
                timeOut(data: any): void {
                    Prompt.notice('请求超时！');
                },
            } as DataBackAction;

            const page: Page = this.page;
            const query: GroupInviteeApplyQuery = new GroupInviteeApplyQuery();
            query.inviteeHandleType = GroupInviteApply.INVITEE_HANDLE_TYPE_UNTREATED;
            const groupInviteController: GroupInviteController = app.appContext.getMaterial(GroupInviteController);
            groupInviteController.getInviteeList(query, page, back);
        }

        private setList(list: any[], page: Page) {
            if (!list) {
                list = [];
            }
            if (page) {
                const totalCount = page.totalCount;
                this.page.totalCount = totalCount;
            }
            const groupBox: GroupBox = app.appContext.getMaterial(GroupBox);
            for (const data of list) {
                if (!data.inviterUser) {
                    data.inviterUser = new User();
                }
                if (!data.apply) {
                    data.apply = new GroupInviteApply();
                }
                if (!data.group) {
                    data.group = new Group();
                }
                UserInfoUtil.handleAvatar(data.inviterUser);
                GroupInfoUtil.handleAvatar(data.group);
            }
            this.list = list;
        }

        private reject(apply: GroupInviteApply): void {
            this.inviteHandle(GroupInviteApply.VERIFY_HANDLE_TYPE_REJECT, apply);
        }

        private accept(apply: GroupInviteApply): void {
            this.inviteHandle(GroupInviteApply.VERIFY_HANDLE_TYPE_ACCEPT, apply);
        }

        private inviteHandle(handleType: string, apply: GroupInviteApply) {
            const own = this;
            const back: DataBackAction = {
                back(data: any): void {
                    if (data) {
                        const info = data.info;
                        if (info) {
                            if (info.success) {
                                apply.inviteeHandleType = handleType;
                            }
                        }
                    }
                },
                lost(data: any): void {
                    Prompt.notice('请求失败！');
                },
                timeOut(data: any): void {
                    Prompt.notice('请求超时！');
                },
            } as DataBackAction;

            const handle: GroupInviteeHandleData = new GroupInviteeHandleData();
            const groupInviteController: GroupInviteController = app.appContext.getMaterial(GroupInviteController);
            handle.inviteeHandleType = handleType;
            handle.applyIds.push(apply.id);
            groupInviteController.inviteeHandle(handle, back);
        }
    }


</script>

<style lang="less">

</style>

