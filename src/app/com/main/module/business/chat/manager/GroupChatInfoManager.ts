import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Group from '@/app/com/main/module/business/group/bean/Group';
import GroupBox from '@/app/com/main/module/business/group/box/GroupBox';
import ViewEnum from '@/app/com/client/common/view/ViewEnum';
import GroupChatView from '@/app/com/main/module/business/chat/view/GroupChatView';


export default class GroupChatInfoManager extends AbstractMaterial {

    public showGroupChatById(groupId: string) {
        const groupBox: GroupBox = this.appContext.getMaterial(GroupBox);
        const group: Group = groupBox.getGroup(groupId);
        if (group) {
            this.showGroupChat(group);
        }
    }

    public showGroupChat(group: Group) {
        const groupChatView: GroupChatView = this.appContext.getView(ViewEnum.GroupChatView);
        groupChatView.setGroup(group);
        groupChatView.setVisible(true);
    }

    public isChatShowing(groupId: string): boolean {
        let showing = false;
        const groupChatView: GroupChatView = this.appContext.getView(ViewEnum.GroupChatView);
        showing = (groupChatView.isVisible() && groupChatView.isShowing(groupId));
        return showing;
    }
}
