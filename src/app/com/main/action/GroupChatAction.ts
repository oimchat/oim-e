import {MethodMapping} from '@/app/base/action/annotation/ActionDecorator';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupChatService from '@/app/com/main/service/GroupChatService';
import Content from '@/app/com/data/chat/content/Content';

export default class GroupChatAction extends AbstractMaterial {
    private static action: string = '2.3.001';

    @MethodMapping(GroupChatAction, GroupChatAction.action, '1.2.0001')
    public update(data: any): void {
        if (data && data.body) {
            const userId: string = data.body.userId;
            const groupId: string = data.body.groupId;
            const content: Content = data.body.content;
            const ucs: GroupChatService = this.appContext.getMaterial(GroupChatService);
            ucs.chat(true, userId, groupId, content);
        }
    }
}
