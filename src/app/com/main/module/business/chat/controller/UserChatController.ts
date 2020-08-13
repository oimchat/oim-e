import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Content from '@/app/com/common/chat/Content';
import DataBackAction from '@/app/base/net/DataBackAction';
import UserChatSender from '@/app/com/main/module/business/chat/sender/UserChatSender';
import PersonalBox from '@/app/com/main/module/business/personal/box/PersonalBox';

export default class UserChatController extends AbstractMaterial {

    public chat(receiveUserId: string, content: Content, back?: DataBackAction): void {
        const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
        const userChatSender: UserChatSender = this.appContext.getMaterial(UserChatSender);
        userChatSender.chat(pb.getUserId(), receiveUserId, content, back);
    }
}
