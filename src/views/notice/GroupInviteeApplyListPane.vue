<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                邀请列表
            </p>
            <div slot="extra" @click="handleLoadList">
                <Button type="primary" icon="search">刷新</Button>
            </div>
            <Row>
                <div style="overflow-y:auto;max-height:350px">

                    <div v-for='item in list' class="notice-message-item only-shadow">
                        <div class="data-warp">
                            <div class="data">
                                <div class="content">
                                    <div :class="'find-item-info'">
                                        <div class="ext">
                                        </div>
                                        <div class="avatar">
                                            <img class="img" :src="item.inviterUser.avatar" alt="avatar">
                                        </div>

                                        <div class="info">
                                            <h3 class="nickname">
                                                <span class="nickname-text">{{item.inviterUser.nickname}}({{item.inviterUser.account}})</span>
                                            </h3>
                                            <p class="msg">
                                                <span class="">{{item.inviterUser.signature}}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <span style="color: #57b7ff">邀请您加入</span>
                                    <div :class="'find-item-info'">
                                        <div class="ext">
                                        </div>
                                        <div class="avatar">
                                            <img class="img" :src="item.group.avatar" alt="avatar">
                                        </div>

                                        <div class="info">
                                            <h3 class="nickname">
                                                <span class="nickname-text">{{item.group.name}}({{item.group.number}})</span>
                                            </h3>
                                            <p class="msg">
                                                <span class="">{{item.group.introduce}}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="action">
                                <div v-if="item.apply.inviteeHandleType==='0'">
                                    <p class="attr"><a @click="accept(item.apply)" href="javascript:;">同意</a></p>
                                    <p class="attr"><a @click="reject(item.apply)" href="javascript:;">拒绝</a></p>
                                </div>
                            </div>
                        </div>
                        <div class="more">
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
    import GroupJoinController from '@/app/com/main/module/business/group/controller/GroupJoinController';
    import GroupJoinApply from '@/app/com/main/module/business/group/bean/GroupJoinApply';
    import Page from '@/app/com/common/data/Page';
    import DataBackAction from '@/app/base/net/DataBackAction';
    import Prompt from '@/platform/web/common/Prompt';
    import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';
    import User from '@/app/com/main/module/business/user/bean/User';
    import GroupJoinHandleData from '@/app/com/main/module/business/group/data/GroupJoinHandleData';
    import GroupJoinApplyEntityCase from '@/app/com/main/module/business/group/data/GroupJoinApplyEntityCase';
    import GroupJoinApplyQuery from '@/app/com/main/module/business/group/data/GroupJoinApplyQuery';
    import GroupInviteController from '@/app/com/main/module/business/group/controller/GroupInviteController';
    import GroupInviteApplyQuery from '@/app/com/main/module/business/group/data/GroupInviteApplyQuery';
    import GroupInviteApply from '@/app/com/main/module/business/group/bean/GroupInviteApply';
    import GroupInviteVerifyHandleData from '@/app/com/main/module/business/group/data/GroupInviteVerifyHandleData';
    import GroupBox from '@/app/com/main/module/business/group/box/GroupBox';
    import Group from '@/app/com/main/module/business/group/bean/Group';
    import GroupInfoUtil from '@/app/com/main/common/util/GroupInfoUtil';
    import GroupInviteeApplyQuery from '@/app/com/main/module/business/group/data/GroupInviteeApplyQuery';
    import GroupInviteeHandleData from '@/app/com/main/module/business/group/data/GroupInviteeHandleData';
    import GroupInviteeController from '@/app/com/main/module/business/group/controller/GroupInviteeController';

    @Component({
        components: {},
    })
    export default class GroupInviteeApplyListPane extends Vue {

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
            const page: Page = this.page;
            const query: GroupInviteeApplyQuery = new GroupInviteeApplyQuery();
            query.inviteeHandleType = GroupInviteApply.INVITEE_HANDLE_TYPE_UNTREATED;
            const controller: GroupInviteeController = app.appContext.getMaterial(GroupInviteeController);
            controller.queryInviteeDataList(query, page, (p, items) => {
                own.setList(items, p);
            });
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
            const controller: GroupInviteeController = app.appContext.getMaterial(GroupInviteeController);
            handle.inviteeHandleType = handleType;
            handle.applyIds.push(apply.id);
            controller.inviteeHandle(handle, back);
        }
    }


</script>

<style lang="scss" scoped>
    @import "../../styles/oim/notice";
</style>

