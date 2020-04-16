<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                请求列表
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
        <AcceptContactAddApply ref="acceptContactAddApply"></AcceptContactAddApply>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import AcceptContactAddApply from '@/views/notice/AcceptContactAddApply.vue';
    import app from '@/app/App';
    import ContactController from '@/app/com/main/controller/ContactController';
    import ContactAddApply from '@/app/com/bean/ContactAddApply';
    import Page from '@/app/com/data/common/Page';
    import DataBackAction from '@/app/base/net/DataBackAction';
    import Prompt from '@/component/common/Prompt';
    import ContactAddApplyEntityCase from '@/app/com/data/ContactAddApplyEntityCase';
    import UserInfoUtil from '@/app/com/main/util/UserInfoUtil';
    import User from '@/app/com/bean/User';
    import ContactAddHandleData from '@/app/com/data/ContactAddHandleData';
    import ContactAddApplyQuery from '@/app/com/data/ContactAddApplyQuery';
    import ContactAddApplyController from '@/app/com/main/controller/ContactAddApplyController';

    @Component({
        components: {
            AcceptContactAddApply,
        },
    })
    export default class ContactApplyNotice extends Vue {

        private list: ContactAddApplyEntityCase[] = [];
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
            const query: ContactAddApplyQuery = new ContactAddApplyQuery();
            const page: Page = this.page;
            query.handleType = ContactAddApply.HANDLE_TYPE_UNTREATED;

            const controller: ContactAddApplyController = app.appContext.getMaterial(ContactAddApplyController);
            controller.queryApplyDataReceiveList(query, page, (p, items) => {
                own.setList(items, p);
            });

        }

        private setList(list: ContactAddApplyEntityCase[], page: Page) {
            if (!list) {
                list = [];
            }
            if (page) {
                const totalCount = page.totalCount;
                this.page.totalCount = totalCount;
            }
            for (const data of list) {
                if (!data.user) {
                    data.user = new User();
                }
                if (!data.user) {
                    data.user = new User();
                }
                if (!data.apply) {
                    data.apply = new ContactAddApply();
                }
                UserInfoUtil.handleAvatar(data.user);
            }
            this.list = list;
        }

        private reject(apply: ContactAddApply): void {
            const own = this;
            const back: DataBackAction = {
                back(data: any): void {
                    if (data) {
                        const info = data.info;
                        if (info) {
                            if (info.success) {
                                apply.handleType = '2';
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

            const handle: ContactAddHandleData = new ContactAddHandleData();
            const contactController: ContactController = app.appContext.getMaterial(ContactController);
            handle.handleType = '2';
            handle.applyIds.push(apply.id);
            contactController.sendAddResponse(handle, back);
        }

        private accept(apply: ContactAddApply): void {
            const onBack = (handleType: string): void => {
                apply.handleType = handleType;
            };
            const name = 'acceptContactAddApply';
            const acceptContactAddApplyName = 'acceptContactAddApply';
            const acceptContactAddApply: any = this.$refs[acceptContactAddApplyName];
            acceptContactAddApply.setApplyId(apply.id, onBack);
            acceptContactAddApply.setShow(true);
        }
    }


</script>

<style lang="less">

</style>

