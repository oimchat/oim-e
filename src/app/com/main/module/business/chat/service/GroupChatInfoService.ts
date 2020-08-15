import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Group from '@/app/com/main/module/business/group/bean/Group';
import GroupChatInfoManager from '@/app/com/main/module/business/chat/manager/GroupChatInfoManager';
import GroupChatManager from '@/app/com/main/module/business/chat/manager/GroupChatManager';
import GroupChatOpenManager from '@/app/com/main/module/business/chat/manager/GroupChatOpenManager';
import Prompter from '@/app/com/client/component/Prompter';
import GroupAccess from '@/app/com/main/module/business/group/access/GroupAccess';


export default class GroupChatInfoService extends AbstractMaterial {

    public showGroupChatById(groupId: string) {
        const own = this;
        const prompter: Prompter = this.appContext.getMaterial(Prompter);
        const groupAccess: GroupAccess = this.appContext.getMaterial(GroupAccess);
        groupAccess.getGroupById(groupId, (success, message: string, group) => {
            if (success) {
                own.showChatByInfo(group);
            } else {
                prompter.warn('加载群失败');
            }
        });
    }

    public showChatByInfo(group: Group) {
        const groupId = group.id;

        const groupChatInfoManager: GroupChatInfoManager = this.appContext.getMaterial(GroupChatInfoManager);
        const groupChatOpenManager: GroupChatOpenManager = this.appContext.getMaterial(GroupChatOpenManager);
        const groupChatManager: GroupChatManager = this.appContext.getMaterial(GroupChatManager);

        groupChatInfoManager.showGroupChat(group);
        groupChatOpenManager.openGroupChatById(groupId);
        groupChatManager.firstLoadHistory(groupId, '', 10);
    }
}
