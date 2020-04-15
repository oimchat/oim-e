<template>
    <div>
        <Card style="width: 100%;height: 100%;top: 20px">
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                查找用户
            </p>

            <Card>
                <p slot="title">

                </p>
                <Row slot="extra">
                    <Input v-model="query.queryText" placeholder="请输入条件搜搜..." style="width: 200px"/>
                    <span @click="handleSearch" style="margin: 0 10px;">
                    <Button type="primary" icon="search">搜索</Button>
                </span>

                </Row>
                <div class="find_wrap">
                    <div v-for='item in list' class="find_item find_item_hover">
                        <div class='avatar'>
                            <Avatar :src="item.avatar" size="large" :title="item.nickname"></Avatar>
                        </div>
                        <div class="info">
                            <h3 class="nickname">
                                <span :title="item.nickname" class="nickname_text">{{item.nickname}}</span>
                            </h3>
                            <p class="msg" style='height: 25px'>
                                <span class="">{{item.signature}}</span>
                            </p>
                            <p>
                                <Button @click="handleAddUser(item.id)" type="info" size="small" icon="ios-add-circle">
                                    添加
                                </Button>
                            </p>
                        </div>
                    </div>
                </div>
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
            <AddUser ref="addUserView"></AddUser>
        </Card>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import AddUser from '@/views/find/AddUser.vue';

    import UserQuery from '@/app/com/data/UserQuery';
    import Page from '@/app/com/data/common/Page';
    import app from '@/app/App';
    import UserController from '@/app/com/main/controller/UserController';
    import User from '@/app/com/bean/User';
    import DataBackAction from '@/app/base/net/DataBackAction';
    import Prompt from '@/component/common/Prompt';
    import UserInfoUtil from '@/app/com/main/util/UserInfoUtil';

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
            const uc: UserController = app.appContext.getMaterial(UserController);
            uc.queryUserList(query, page, back);
        }

        private setList(list: User[], page: Page) {
            if (!list) {
                list = [];
            }
            if (page) {
                const totalCount = page.totalCount;
                this.page.totalCount = totalCount;
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

<style scoped>

</style>
