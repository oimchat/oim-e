import {MethodMapping} from '@/app/base/action/annotation/ActionDecorator';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import UserChatService from '@/app/com/main/service/UserChatService';
import Content from '@/app/com/data/chat/content/Content';

export default class RecentChatAction extends AbstractMaterial {
    private static action: string = '2.1.001';

    @MethodMapping(RecentChatAction, RecentChatAction.action, '1.2.0001')
    public update(data: any): void {
        if (data && data.body) {
            const sendUserId: string = data.body.sendUserId;
            const receiveUserId: string = data.body.receiveUserId;
            const content: Content = data.body.content;
            const ucs: UserChatService = this.appContext.getMaterial(UserChatService);
            ucs.chat(true, sendUserId, receiveUserId, content);
        }
    }
}
