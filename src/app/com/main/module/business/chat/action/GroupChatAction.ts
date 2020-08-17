import {MethodMapping} from '@/app/base/action/annotation/ActionDecorator';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupChatService from '@/app/com/main/module/business/chat/service/GroupChatService';
import Content from '@/app/com/common/chat/Content';
import BaseContentItemUtil from '@/app/com/common/chat/util/BaseContentItemUtil';
import User from '@/app/com/main/module/business/user/bean/User';
import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';

export default class GroupChatAction extends AbstractMaterial {
    private static action: string = '2.3.001';

    @MethodMapping(GroupChatAction, GroupChatAction.action, '1.2.0001')
    public update(data: any): void {
        if (data && data.body) {
            const userId: string = data.body.userId;
            const groupId: string = data.body.groupId;
            const content: Content = data.body.content;
            const user: User = data.body.user;
            UserInfoUtil.handleAvatar(user);
            const ucs: GroupChatService = this.appContext.getMaterial(GroupChatService);
            ucs.chat(true, userId, user, groupId, content);
        }
    }
}
