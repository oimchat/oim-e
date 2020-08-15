import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Group from '@/app/com/main/module/business/group/bean/Group';
import GroupChatInfoService from '@/app/com/main/module/business/chat/service/GroupChatInfoService';
import GroupChatItemService from '@/app/com/main/module/business/chat/service/GroupChatItemService';
import Prompter from '@/app/com/client/component/Prompter';
import GroupAccess from '@/app/com/main/module/business/group/access/GroupAccess';

export default class GroupChatViewController extends AbstractMaterial {

    public showGroupChatById(groupId: string) {
        const own = this;
        const prompter: Prompter = this.appContext.getMaterial(Prompter);
        const groupAccess: GroupAccess = this.appContext.getMaterial(GroupAccess);
        groupAccess.getGroupById(groupId, (success, message: string, group) => {
            if (success) {
                own.showGroupChatByInfo(group);
            } else {
                prompter.warn('加载群失败');
            }
        });
    }

    public showGroupChatByInfo(group: Group) {
        const groupChatItemService: GroupChatItemService = this.appContext.getMaterial(GroupChatItemService);
        const groupChatInfoService: GroupChatInfoService = this.appContext.getMaterial(GroupChatInfoService);
        groupChatInfoService.showChatByInfo(group);
        groupChatItemService.showGroupChatItem(group);
    }
}
