import AbstractMaterial from '@/app/base/AbstractMaterial';
import Content from '@/app/com/data/chat/content/Content';
import DataBackAction from '@/app/base/net/DataBackAction';
import GroupChatSender from '@/app/com/main/sender/GroupChatSender';
import PersonalBox from '@/app/com/main/box/PersonalBox';

export default class GroupChatController extends AbstractMaterial {

    public chat(groupId: string, content: Content, back?: DataBackAction): void {
        const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
        const groupChatSender: GroupChatSender = this.appContext.getMaterial(GroupChatSender);
        groupChatSender.chat(pb.getUserId(), groupId, content, back);
    }
}
