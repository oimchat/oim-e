import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Group from '@/app/com/main/module/business/group/bean/Group';
import WorkViewEnum from '@/app/com/common/view/WorkViewEnum';
import GroupChatView from '@/app/com/main/module/business/chat/view/GroupChatView';
import Prompter from '@/app/com/client/component/Prompter';
import GroupAccess from '@/app/com/main/module/business/group/access/GroupAccess';


export default class GroupChatInfoManager extends AbstractMaterial {

    public showGroupChatById(groupId: string) {
        const own = this;
        const prompter: Prompter = this.appContext.getMaterial(Prompter);
        const groupAccess: GroupAccess = this.appContext.getMaterial(GroupAccess);
        groupAccess.getGroupById(groupId, (success, message: string, group) => {
            if (success) {
                own.showGroupChat(group);
            } else {
                prompter.warn('加载群失败');
            }
        });
    }

    public showGroupChat(group: Group) {
        const groupChatView: GroupChatView = this.appContext.getView(WorkViewEnum.GroupChatView);
        groupChatView.setGroup(group);
        groupChatView.setVisible(true);
    }

    public isChatShowing(groupId: string): boolean {
        let showing = false;
        const groupChatView: GroupChatView = this.appContext.getView(WorkViewEnum.GroupChatView);
        showing = (groupChatView.isVisible() && groupChatView.isShowing(groupId));
        return showing;
    }

    public updateInfo(group: Group) {
        const groupChatView: GroupChatView = this.appContext.getView(WorkViewEnum.GroupChatView);
        groupChatView.setGroup(group);
    }
}
