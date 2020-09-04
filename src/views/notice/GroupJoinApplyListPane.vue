<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                申请列表
            </p>
            <span slot="extra" @click="handleLoadList">
                <Button type="primary" icon="search">刷新</Button>
            </span>
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
                                            <img class="img" :src="item.user.avatar" alt="avatar">
                                        </div>

                                        <div class="info">
                                            <h3 class="nickname">
                                                <span class="nickname-text">{{item.user.nickname}}({{item.user.account}})</span>
                                            </h3>
                                            <p class="msg">
                                                <span class="">{{item.user.signature}}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <span style="color: #57b7ff">申请加入</span>
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
                                <div v-if="item.apply.handleType==='0'">
                                    <p class="attr"><a @click="accept(item.apply)" href="javascript:;">同意</a></p>
                                    <p class="attr"><a @click="reject(item.apply)" href="javascript:;">拒绝</a></p>
                                </div>
                            </div>
                        </div>
                        <div class="more">
                            <div>
                                {{item.apply.message}}
                            </div>
                            <div v-for="(data, index) in item.answers" :key="index">
                                <div class="item">
                                    <div>
                                        <div>
                                            <span>问题:</span>
                                            <label>
                                                {{data.question}}
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <span>答案:</span>
                                            <label>{{data.answer}}</label>
                                        </div>
                                    </div>
                                </div>
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
    import GroupBox from '@/app/com/main/module/business/group/box/GroupBox';

    @Component({
        components: {},
    })
    export default class GroupJoinApplyListPane extends Vue {

        private list: GroupJoinApplyEntityCase[] = [];
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
            const query: GroupJoinApplyQuery = new GroupJoinApplyQuery();
            query.handleType = GroupJoinApply.HANDLE_TYPE_UNTREATED;
            const groupJoinController: GroupJoinController = app.appContext.getMaterial(GroupJoinController);
            groupJoinController.queryApplyDataReceiveList(query, page, (p, items) => {
                own.setList(items, p);
            });
        }

        private setList(list: GroupJoinApplyEntityCase[], page: Page) {
            if (!list) {
                list = [];
            }
            if (page) {
                const totalCount = page.totalCount;
                this.page.totalCount = totalCount;
            }
            const groupBox: GroupBox = app.appContext.getMaterial(GroupBox);

            for (const data of list) {
                if (!data.user) {
                    data.user = new User();
                }
                if (!data.user) {
                    data.user = new User();
                }
                if (!data.apply) {
                    data.apply = new GroupJoinApply();
                }
                UserInfoUtil.handleAvatar(data.user);

                const groupId = data.apply.groupId;
                data.group = groupBox.getGroup(groupId);
            }
            this.list = list;
        }

        private reject(apply: GroupJoinApply): void {
            this.joinHandle(GroupJoinApply.HANDLE_TYPE_REJECT, apply);
        }

        private accept(apply: GroupJoinApply): void {
            this.joinHandle(GroupJoinApply.HANDLE_TYPE_ACCEPT, apply);
        }

        private joinHandle(handleType: string, apply: GroupJoinApply) {
            const own = this;
            const back: DataBackAction = {
                back(data: any): void {
                    if (data) {
                        const info = data.info;
                        if (info) {
                            if (info.success) {
                                apply.handleType = handleType;
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

            const handle: GroupJoinHandleData = new GroupJoinHandleData();
            const contactController: GroupJoinController = app.appContext.getMaterial(GroupJoinController);
            handle.handleType = handleType;
            handle.applyIds.push(apply.id);
            contactController.joinHandle(handle, back);
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/oim/notice";
</style>

