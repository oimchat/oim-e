<template>
    <div class="only-full-pane">
        <div class="only-card only-full-pane">
            <div class="top only-border-bottom" style="-webkit-app-region: drag">
                <div class="title-wrap">
                    <div class="title">查找群</div>
                    <div></div>
                </div>
            </div>
            <div class="content">
                <q-card class="" style="height: 100%;" flat bordered>
                    <q-card flat bordered>
                        <q-item>
                            <q-item-section>
                                <div>
                                    <div class="page-center">
                                        <q-pagination
                                                v-model="page.number"
                                                :max="page.totalPage"
                                                :direction-links="true"
                                                size="12px"
                                                @input="handlePage"
                                        >
                                        </q-pagination>
                                    </div>
                                </div>
                            </q-item-section>
                            <q-card-actions align="right">
                                <Input v-model="query.queryText" placeholder="请输入条件搜搜..." style="width: 200px"/>
                                <span style="margin-right: 20px"></span>
                                <Button @click="handleSearch" type="primary" icon="search">搜索</Button>
                            </q-card-actions>
                        </q-item>
                    </q-card>
                    <div class="q-pa-md find-scrollbar-y">
                        <div class="row justify-center q-gutter-sm ">
                            <div v-for='item in list' class="find-item only-shadow">
                                <div :class="'find-info'">
                                    <div class="avatar">
                                        <img :class="'img'" :src="item.avatar" alt="avatar">
                                    </div>
                                    <div class="info">
                                        <h3 class="nickname">
                                            <span class="nickname-text">{{item.nickname}}</span>
                                        </h3>
                                        <p class="msg">
                                            <span class="">{{item.signature}}</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="find-action">
                                    <Button @click="handleAddUser(item.id)" type="info" size="small"
                                            icon="ios-add-circle">
                                        添加
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </q-card>
            </div>
        </div>


        <AddUser ref="addUserView"></AddUser>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';

    import AddUser from '@/views/module/contact/apply/ContactAddApply.vue';

    import UserQuery from '@/app/com/main/module/business/user/data/UserQuery';
    import Page from '@/app/com/common/data/Page';
    import app from '@/app/App';
    import UserInfoController from '@/app/com/main/module/business/user/controller/UserInfoController';
    import User from '@/app/com/main/module/business/user/bean/User';
    import DataBackAction from '@/app/base/net/DataBackAction';
    import Prompt from '@/platform/web/common/Prompt';
    import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';

    @Component({
        components: {AddUser},
    })
    export default class FindUser extends Vue {
        @Prop({
            type: Boolean,
            required: false,
            default: () => (false),
        })
        private show!: boolean;

        private query: UserQuery = new UserQuery();
        private page: Page = new Page();
        private list: User[] = [];

        public mounted() {
            // do something
        }

        private handlePage(value: number): void {
            const own = this;
            own.page.number = value;
            this.queryList();
        }

        private handlePageSize(value: number): void {
            const own = this;
            own.page.size = value;
            this.queryList();
        }

        private handleSearch(): void {
            const own = this;
            own.page.number = 1;
            this.queryList();
        }

        private queryList(): void {

            const own = this;
            const back: DataBackAction = {
                back(data: any): void {
                    if (data) {
                        const info = data.info;
                        if (info) {
                            if (info.success && data.body) {
                                const list: User[] = data.body.items;
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

            const query: UserQuery = this.query;
            const page: Page = this.page;
            const uc: UserInfoController = app.appContext.getMaterial(UserInfoController);
            uc.queryUserList(query, page, back);
        }

        private setList(list: User[], page: Page) {
            if (!list) {
                list = [];
            }
            if (page) {
                const totalCount = page.totalCount;
                this.page.totalCount = totalCount;
                this.page.totalPage = page.totalPage;
            }
            for (const user of list) {
                UserInfoUtil.handleAvatar(user);
            }
            this.list = list;
        }

        private handleAddUser(userId: string) {
            const addUserViewName = 'addUserView';
            const addUserView: any = this.$refs[addUserViewName];
            addUserView.setUserId(userId);
            addUserView.setShow(true);
        }
    }
</script>

<style lang="scss" scoped>

    .content {
        padding: 15px;
    }

    .find-scrollbar-y {
        overflow-y: auto;
        position: absolute;
        top: 65px;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .find-card {
        max-height: calc(100% - 20px);
    }

    .find-list {
        margin-right: -4px;
        max-height: calc(100% - 20px);
        overflow-y: auto;
        overflow-x: hidden
    }

    .find-item {
        width: 180px;
        /*height: 125px;*/
        float: left;
        position: relative;
        margin-right: 7px;
        margin-left: 7px;
        margin-top: 7px;
        padding: 10px;
        background: #f0f0f0;
        border-radius: 4px;
        overflow: hidden;
        cursor: pointer;
    }

    .find-item:hover {
        background: rgba(206, 205, 205, 0.5);
    }


    .find-info {
        overflow: hidden;
        padding: 12px 0px 11px;
        /*border-bottom: 1px solid #647481;*/
        cursor: pointer;
        position: relative
    }

    .find-info.top {
        background-color: #2e3641
    }

    .find-info.active {
        background: #cbced0
    }

    .find-info.active .ext, .find-info.active .info .msg {
        color: #181818
    }

    .find-info .avatar {
        float: left;
        margin-right: 10px;
        position: relative
    }

    .find-info .avatar .img {
        display: block;
        width: 40px;
        height: 40px;
        /*border-radius: 2px;*/
        /*-moz-border-radius: 2px;*/
        /*-webkit-border-radius: 2px*/
        border-radius: 50%;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
    }

    .find-info .avatar .icon {
        position: absolute;
        top: -6px;
        right: -6px;
        color: #fff;
        font-style: normal;
        font-size: 12px;
        text-align: center
    }

    .find-info .info {
        overflow: hidden
    }

    .find-info .info .nickname {
        font-weight: 400;
        font-size: 13px;
        color: #0a0a0a;
        line-height: 20px
    }

    .find-info .info .nickname-text {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal
    }

    .find-info .info .nickname_count, .find-info .info .nickname-text {
        display: inline-block;
        *display: inline;
        *zoom: 1;
        vertical-align: top
    }

    .find-info .info .msg {
        color: #989898;
        font-size: 13px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        height: 1.5em
    }

    .find-info .ext {
        float: right;
        color: #6b6f7c;
        font-size: 13px;
        text-align: right
    }

    .find-info .ext .attr {
        height: 19px;
        line-height: 1.5
    }

    .find-action {
        float: right;
    }
</style>
