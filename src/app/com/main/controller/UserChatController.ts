import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Content from '@/app/com/data/chat/content/Content';
import DataBackAction from '@/app/base/net/DataBackAction';
import UserChatSender from '@/app/com/main/sender/UserChatSender';
import PersonalBox from '@/app/com/main/box/PersonalBox';

export default class UserChatController extends AbstractMaterial {

    public userChat(receiveUserId: string, content: Content, back?: DataBackAction): void {
        const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
        const userChatSender: UserChatSender = this.appContext.getMaterial(UserChatSender);
        userChatSender.userChat(pb.getUserId(), receiveUserId, content, back);
    }
}
