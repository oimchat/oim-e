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
                            <template v-for='item in list'>
                                <q-card class="find-item">
                                    <q-img :src="item.avatar" class="find-item-img">
                                        <div class="absolute-bottom">
                                            <div class="text-h6 name-text">{{item.name}}</div>
                                            <div class="text-subtitle2 name-text">{{item.introduce}}</div>
                                        </div>
                                    </q-img>
                                    <q-card-actions align="right">
                                        <q-btn flat></q-btn>
                                        <q-btn @click="handleJoinGroup(item.id)" flat>加入</q-btn>
                                    </q-card-actions>
                                </q-card>
                            </template>
                        </div>
                    </div>
                </q-card>
            </div>
        </div>
        <JoinGroup ref="joinGroupView"></JoinGroup>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import JoinGroup from '@/views/module/group/find/GroupJoin.vue';
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
            // this.page.size = 3;
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
                this.page.totalPage = page.totalPage;
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

    .find-item {
        /*height: 190px;*/
        /*width: 190px;*/

    }

    .find-item-img {
        width: 190px;
        height: 100px;
    }

    .name-text {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal
    }

    .query-bar {
        text-align: right;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal
    }

    .page-center {
        text-align: center;
    }
</style>
