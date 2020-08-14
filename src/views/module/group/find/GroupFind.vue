<template>
    <div class="only-full-pane">
        <div class="only-card only-full-pane">
            <div class="top">
                <div class="title-wrap">
                    <div class="title">查找群</div>
                    <div></div>
                </div>
            </div>
            <q-card>
                <div class="query-bar ">
                    <div class="row" style="float: right">
                        <q-input v-model="query.queryText" placeholder="请输入条件搜搜..." style="width: 200px"/>
                        <div style="margin-left:20px;margin-right:30px;padding-top: 10px">
                            <q-btn @click="handleSearch" color="primary" label="Primary"/>
                        </div>
                    </div>
                </div>
            </q-card>
            <div class="q-pa-md">
                <div class="row justify-center q-gutter-sm">

                    <template v-for='item in list'>
                        <q-intersection
                                once
                                transition="scale"
                                class="find-item"
                        >
                            <q-card class="q-ma-sm">
                                <Avatar :src="item.avatar" size="large" :title="item.name"></Avatar>

                                <q-card-section>
                                    <div class="text-h6">{{item.name}}</div>
                                    <div class="text-subtitle2">by John Doe</div>
                                    <Button @click="handleJoinGroup(item.id)" type="info" size="small"
                                            icon="ios-add-circle">申请加入
                                    </Button>
                                </q-card-section>
                            </q-card>
                        </q-intersection>
                    </template>
                </div>
            </div>
            <q-card>
                <div class="page-center">
                    <q-pagination
                            v-model="page.number"
                            :max="page.totalPage"
                            :direction-links="true"
                            @input="handlePage"
                    >
                    </q-pagination>
                </div>
            </q-card>
        </div>
        <!--        <JoinGroup ref="joinGroupView"></JoinGroup>-->
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

<style lang="scss" scoped>
    .find-item {
        height: 290px;
        width: 290px;
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
