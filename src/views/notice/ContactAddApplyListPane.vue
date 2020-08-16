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
                            <div v-for="(item, index) in item.answers" :key="index">
                                <div class="item">
                                    <div>
                                        <div>
                                            <span>问题:</span>
                                            <label>{{item.question}}</label>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <span>答案:</span>
                                            <label>{{item.answer}}</label>
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
        <ContactAddApplyAccept ref="acceptContactAddApply"></ContactAddApplyAccept>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import ContactAddApplyAccept from '@/views/notice/ContactAddApplyAccept.vue';
    import app from '@/app/App';
    import ContactController from '@/app/com/main/module/business/contact/controller/ContactController';
    import ContactAddApply from '@/app/com/main/module/business/contact/bean/ContactAddApply';
    import Page from '@/app/com/common/data/Page';
    import DataBackAction from '@/app/base/net/DataBackAction';
    import Prompt from '@/platform/web/common/Prompt';
    import ContactAddApplyEntityCase from '@/app/com/main/module/business/contact/data/ContactAddApplyEntityCase';
    import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';
    import User from '@/app/com/main/module/business/user/bean/User';
    import ContactAddHandleData from '@/app/com/main/module/business/contact/data/ContactAddHandleData';
    import ContactAddApplyQuery from '@/app/com/main/module/business/contact/data/ContactAddApplyQuery';
    import ContactAddApplyController from '@/app/com/main/module/business/contact/controller/ContactAddApplyController';

    @Component({
        components: {
            ContactAddApplyAccept,
        },
    })
    export default class ContactAddApplyListPane extends Vue {

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

<style lang="scss" scoped>
    @import "../../styles/oim/notice";
</style>

