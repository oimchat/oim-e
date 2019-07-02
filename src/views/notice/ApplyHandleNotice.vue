<template>
    <Tabs value="name1" :animated="false">
        <TabPane label="联系人验证" name="name1">
            <ContactApplyNotice></ContactApplyNotice>
        </TabPane>
        <TabPane label="群申请加入验证" name="name2">
            <GroupJoinApplyNotice></GroupJoinApplyNotice>
        </TabPane>
        <TabPane label="群邀请加入验证" name="name3">
            <GroupInviteApplyNoticePane></GroupInviteApplyNoticePane>
        </TabPane>
        <TabPane label="被邀请加入群处理" name="name4">
            <GroupInviteeJoinNoticePane></GroupInviteeJoinNoticePane>
        </TabPane>
    </Tabs>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import ContactApplyNotice from '@/views/notice/ContactApplyNotice.vue';
    import GroupJoinApplyNotice from '@/views/notice/GroupJoinApplyNotice.vue';
    import GroupInviteApplyNoticePane from '@/views/notice/GroupInviteApplyNoticePane.vue';
    import GroupInviteeJoinNoticePane from '@/views/notice/GroupInviteeJoinNoticePane.vue';

    @Component({
        components: {
            ContactApplyNotice,
            GroupJoinApplyNotice,
            GroupInviteApplyNoticePane,
            GroupInviteeJoinNoticePane,
        },
    })
    export default class ApplyHandleNotice extends Vue {

        public mounted() {
            // do not
        }
    }
</script>

<style lang="less">
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

