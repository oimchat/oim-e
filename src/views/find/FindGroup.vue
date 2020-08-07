<template>
    <div>
        <Card style="width: 100%;height: 100%;top: 20px">
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                查找群
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
                    <div v-for='item in list' class="find_item">
                        <div class='avatar'>
                            <Avatar :src="item.avatar" size="large" :title="item.name"></Avatar>
                        </div>
                        <div class="info">
                            <h3 class="nickname">
                                <span :title="item.name" class="nickname_text">{{item.name}}</span>
                            </h3>
                            <p class="msg" style='height: 25px'>
                                <span class=""></span>
                            </p>
                            <p>
                                <Button @click="handleJoinGroup(item.id)" type="info" size="small"
                                        icon="ios-add-circle">申请加入
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
            <JoinGroup ref="joinGroupView"></JoinGroup>
        </Card>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import JoinGroup from '@/views/find/JoinGroup.vue';
    import GroupQuery from '@/app/com/main/module/business/group/data/GroupQuery';
    import Page from '@/app/com/common/data/Page';
    import app from '@/app/App';
    import GroupInfoController from '@/app/com/main/module/business/group/controller/GroupInfoController';
    import Group from '@/app/com/main/module/business/group/bean/Group';
    import DataBackAction from '@/app/base/net/DataBackAction';
    import Prompt from '@/platform/web/common/Prompt';
    import GroupInfoUtil from '@/app/com/main/common/util/GroupInfoUtil';

    @Component({
        components: {JoinGroup},
    })
    export default class FindGroup extends Vue {
        @Prop({
            type: Boolean,
            required: false,
            default: () => (false),
        })
        private show!: boolean;

        private query: GroupQuery = new GroupQuery();
        private page: Page = new Page();
        private list: Group[] = [];

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
                                const list: Group[] = data.body.items;
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

            const query: GroupQuery = this.query;
            const page: Page = this.page;
            const uc: GroupInfoController = app.appContext.getMaterial(GroupInfoController);
            uc.queryGroupList(query, page, back);
        }

        private setList(list: Group[], page: Page) {
            if (!list) {
                list = [];
            }
            if (page) {
                const totalCount = page.totalCount;
                this.page.totalCount = totalCount;
            }
            for (const group of list) {
                GroupInfoUtil.handleAvatar(group);
            }
            this.list = list;
        }

        private handleJoinGroup(groupId: string) {
            const joinGroupViewName = 'joinGroupView';
            const joinGroupView: any = this.$refs[joinGroupViewName];
            joinGroupView.setGroupId(groupId);
            joinGroupView.setShow(true);
        }
    }
</script>

<style scoped>

</style>
