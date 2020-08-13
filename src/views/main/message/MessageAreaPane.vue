<template>
    <div class="only-full-pane">
        <UserChatPane ref="userChatPane" v-if="model.tab===messagePaneType.UserChat"></UserChatPane>
        <GroupChatPane ref="groupChatPane" v-if="model.tab===messagePaneType.GroupChat"></GroupChatPane>
        <ApplyHandleNotice v-if="model.tab===messagePaneType.ApplyHandle"></ApplyHandleNotice>
        <div v-if="model.tab===messagePaneType.No" class="only-full-pane only-card">
            <div class="top">
                <div></div>
                <div class="title_wrap">
                    <div class="title poi">
                    </div>
                </div>
            </div>
            <div class="only-table-pane only-full-pane">
                <div class="only-table-pane-cell">
                    <div>
                        <img :src="noLogo" height="128" width="128"/>
                        <i class="no_one_icon"></i>
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
import UserChatPane from '@/views/module/chat/UserChatPane.vue';
import GroupChatPane from '@/views/module/chat/GroupChatPane.vue';
import messageAreaViewType from '@/platform/web/view/model/MessageAreaViewType';

import ApplyHandleNotice from '@/views/notice/ApplyHandleNotice.vue';

import app from '@/app/App';
import WorkViewEnum from '@/app/com/common/view/WorkViewEnum';

import messageAreaViewModel from '@/platform/web/view/model/MessageAreaViewModel';
import CommonIcon from '@/platform/web/common/CommonIcon';

@Component({
    components: {
        UserChatPane,
        GroupChatPane,
        ApplyHandleNotice,
    },
})
export default class MessageAreaPane extends Vue implements MessageAreaView {

    private model = messageAreaViewModel;
    private noLogo = CommonIcon.noLogo;

    private type: string = 'no';
    private userChatPaneName = 'userChatPane';
    private messagePaneType = messageAreaViewType;

    public mounted() {
        app.appContext.putViewObject(WorkViewEnum.MessageAreaView, this);
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
