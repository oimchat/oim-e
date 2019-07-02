<template>
    <div style="height: 100%">
        <UserChatPane ref="userChatPane" v-if="type===messagePaneType.TYPE_USER_CHAT"></UserChatPane>
        <GroupChatPane ref="groupChatPane" v-if="type===messagePaneType.TYPE_GROUP_CHAT"></GroupChatPane>
        <ApplyHandleNotice v-if="type===messagePaneType.TYPE_APPLY_HANDLE"></ApplyHandleNotice>
        <div v-if="type===messagePaneType.TYPE_NO" class="box chat">
            <div class="box_hd">
                <div></div>
                <div class="title_wrap">
                    <div class="title poi">
                    </div>
                </div>
            </div>

            <div class="scroll-wrapper box_bd chat_bd scrollbar-dynamic" style="position: absolute;">
                <div class="box_bd chat_bd scrollbar-dynamic scroll-content"
                     style="margin-bottom: 0px; margin-right: 0px; height: 369px;">
                    <div class="message_empty ">
                        <img src="../../../images/main/pane/no.png" height="128" width="128"/>
                        <p class="">暂时没有新消息</p>
                        <p class="">未选择聊天</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import MessageAreaView from '@/app/com/main/view/MessageAreaView';
    import UserChatPane from '@/views/main/message/chat/UserChatPane.vue';
    import GroupChatPane from '@/views/main/message/chat/GroupChatPane.vue';
    import MessagePaneType from '@/views/main/message/MessagePaneType';

    import ApplyHandleNotice from '@/views/notice/ApplyHandleNotice.vue';

    import app from '@/app/App';
    import ViewEnum from '@/app/com/main/view/ViewEnum';

    @Component({
        components: {
            UserChatPane,
            GroupChatPane,
            ApplyHandleNotice,
        },
    })
    export default class MessageAreaPane extends Vue implements MessageAreaView {
        private type: string = 'no';
        private userChatPaneName = 'userChatPane';
        private messagePaneType = new MessagePaneType();

        public mounted() {
            app.appContext.putViewObject(ViewEnum.MessageAreaView, this);
        }

        public showType(type: string): void {
            this.type = type;
        }

        public getType(): string {
            return this.type;
        }

        private getView(name: string): any {
            const view: any = this.$refs[name];
            return view;
        }
    }
</script>

<style scoped>

</style>
