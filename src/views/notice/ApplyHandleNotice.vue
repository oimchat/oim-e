<template>
    <div>
        <q-tabs
                v-model="model.tab"
                no-caps
                class="bg-orange text-white shadow-2"
        >
            <q-tab :name="type.ContactAddApplyListView" label="联系人验证"/>
            <q-tab :name="type.GroupJoinApplyListView" label="群申请加入验证"/>
            <q-tab :name="type.GroupInviteApplyListView" label="群邀请加入验证"/>
            <q-tab :name="type.GroupInviteeApplyListView" label="群被邀请加入处理"/>
        </q-tabs>
        <q-tab-panels
                v-model="model.tab"
                animated
                transition-prev="jump-up"
                transition-next="jump-up"
        >
            <q-tab-panel :name="type.ContactAddApplyListView">
                <contact-add-apply-list-pane></contact-add-apply-list-pane>
            </q-tab-panel>
            <q-tab-panel :name="type.GroupJoinApplyListView">
                <group-join-apply-list-pane></group-join-apply-list-pane>
            </q-tab-panel>
            <q-tab-panel :name="type.GroupInviteApplyListView">
                <group-invite-apply-list-pane></group-invite-apply-list-pane>
            </q-tab-panel>
            <q-tab-panel :name="type.GroupInviteeApplyListView">
                <group-invitee-apply-list-pane></group-invitee-apply-list-pane>
            </q-tab-panel>
        </q-tab-panels>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import applyHandleViewModel from '@/platform/web/view/model/ApplyHandleViewModel';
    import ApplyHandleType from '@/platform/web/view/data/ApplyHandleType';

    import ContactAddApplyListPane from '@/views/notice/ContactAddApplyListPane.vue';
    import GroupJoinApplyListPane from '@/views/notice/GroupJoinApplyListPane.vue';
    import GroupInviteApplyListPane from '@/views/notice/GroupInviteApplyListPane.vue';
    import GroupInviteeApplyListPane from '@/views/notice/GroupInviteeApplyListPane.vue';

    @Component({
        components: {
            ContactAddApplyListPane,
            GroupJoinApplyListPane,
            GroupInviteApplyListPane,
            GroupInviteeApplyListPane,
        },
    })
    export default class ApplyHandleNotice extends Vue {

        private model = applyHandleViewModel;
        private type = ApplyHandleType;

        public mounted() {
            // do not
        }
    }
</script>

<style lang="less">
    .q-tab-panels {
        background: unset;
        height: 100%;
    }

    .scroll {
        overflow: hidden;
    }

    .message-page {
        &-con {
            height: ~"calc(100vh - 176px)";
            display: inline-block;
            vertical-align: top;
            position: relative;

            &.message-category-con {
                border-right: 1px solid #e6e6e6;
                width: 200px;
            }

            &.message-list-con {
                border-right: 1px solid #e6e6e6;
                width: 230px;
            }

            &.message-view-con {
                position: absolute;
                left: 446px;
                top: 16px;
                right: 16px;
                bottom: 16px;
                overflow: auto;
                padding: 12px 20px 0;

                .message-view-header {
                    margin-bottom: 20px;

                    .message-view-title {
                        display: inline-block;
                    }

                    .message-view-time {
                        margin-left: 20px;
                    }
                }
            }

            .category-title {
                display: inline-block;
                width: 65px;
            }

            .gray-dadge {
                background: gainsboro;
            }

            .not-unread-list {
                .msg-title {
                    color: rgb(170, 169, 169);
                }

                .ivu-menu-item {
                    .ivu-btn.ivu-btn-text.ivu-btn-small.ivu-btn-icon-only {
                        display: none;
                    }

                    &:hover {
                        .ivu-btn.ivu-btn-text.ivu-btn-small.ivu-btn-icon-only {
                            display: inline-block;
                        }
                    }
                }
            }
        }
    }
</style>

