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
                <div class="apply-notice-message-page" style="overflow-y:auto;max-height:350px">
                    <div v-for='item in list' class="apply-notice-message-item">
                        <div class="data">
                            <div class="content">
                                <div class='avatar'>
                                    <Avatar :src="item.user.avatar" size="large" :title="item.user.nickname"></Avatar>
                                    <span style="margin-left: 10px" :title="item.user.account"
                                          class="nickname_text">{{item.user.account}}</span>
                                </div>
                                <div class="info">
                                    <h3 class="nickname">
                                    <span :title="item.user.nickname"
                                          class="nickname_text">{{item.user.nickname}}</span>
                                    </h3>
                                    <p class="msg" style='height: 25px'>
                                        <span class="">{{item.user.signature}}</span>
                                    </p>
                                </div>
                            </div>

                            <div class="content">
                                <p class="msg" style='height: 12px'>
                                    <span class="">申请加入</span>
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
                                <Row v-if="item.apply.handleType==='0'">
                                    <Button @click="reject(item.apply)" type="primary" icon="ios-add-circle">拒绝</Button>
                                    <Button @click="accept(item.apply)" type="primary" icon="ios-add-circle">同意</Button>
                                </Row>
                            </div>
                        </div>
                        <div class="more">
                            <Row v-for="(item, index) in item.answerList" :key="index">
                                <Row>
                                    <Row>
                                        <Col span="18">
                                            <span>问题:</span>
                                            <label>
                                                {{item.question}}
                                            </label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="18">
                                            <span>答案:</span>
                                            <label>{{item.answer}}</label>
                                        </Col>
                                    </Row>
                                </Row>
                                <Divider/>
                            </Row>
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
    export default class GroupJoinApplyNotice extends Vue {

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

<style lang="less">

</style>

