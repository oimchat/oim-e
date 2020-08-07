import {MethodMapping} from '@/app/base/action/annotation/ActionDecorator';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import UserChatUnreadService from '@/app/com/main/module/business/chat/service/UserChatUnreadService';

export default class UserChatDataAction extends AbstractMaterial {
    private static action: string = '2.2.002';

    @MethodMapping(UserChatDataAction, UserChatDataAction.action, '1.2.0001')
    public readByUser(data: any): void {
        if (data && data.body) {
            const sendUserId: string = data.body.sendUserId;
            const receiveUserId: string = data.body.receiveUserId;
            const ucs: UserChatUnreadService = this.appContext.getMaterial(UserChatUnreadService);
            ucs.readByUser(sendUserId, receiveUserId);
        }
    }

    @MethodMapping(UserChatDataAction, UserChatDataAction.action, '1.2.0002')
    public readByContent(data: any): void {
        if (data && data.body) {
            const sendUserId: string = data.body.sendUserId;
            const receiveUserId: string = data.body.receiveUserId;
            const contentId: string = data.body.contentId;
            const ucs: UserChatUnreadService = this.appContext.getMaterial(UserChatUnreadService);
            ucs.readByContent(sendUserId, receiveUserId, contentId);
        }
    }
}
