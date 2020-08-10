import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Content from '@/app/com/common/chat/Content';
import DataBackAction from '@/app/base/net/DataBackAction';
import GroupChatSender from '@/app/com/main/module/business/chat/sender/GroupChatSender';
import PersonalBox from '@/app/com/main/module/business/personal/box/PersonalBox';
import User from '@/app/com/main/module/business/user/bean/User';
import AvatarCheckUtil from '@/app/com/main/common/util/AvatarCheckUtil';
import UserBase from '@/app/com/main/module/business/user/bean/UserBase';
import ObjectUtil from '@/app/common/util/ObjectUtil';
import GroupMemberListOfPersonalBox from '@/app/com/main/module/business/group/box/GroupMemberListOfPersonalBox';

export default class GroupChatController extends AbstractMaterial {

    public chat(groupId: string, content: Content, back?: DataBackAction): void {
        const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
        const groupChatSender: GroupChatSender = this.appContext.getMaterial(GroupChatSender);
        const groupMemberListOfPersonalBox: GroupMemberListOfPersonalBox = this.appContext.getMaterial(GroupMemberListOfPersonalBox);
        const u: User = pb.getUser();
        const isNetAvatar = AvatarCheckUtil.isNetAvatar(u.avatar);
        const groupMemberNickname = groupMemberListOfPersonalBox.getNickname(groupId);

        const ub: UserBase = new UserBase();
        ObjectUtil.copyByTargetKey(ub, u);
        if (!isNetAvatar) {
            ub.avatar = '';
        }
        if (groupMemberNickname) {
            ub.nickname = groupMemberNickname;
        }
        groupChatSender.chat(pb.getUserId(), ub, groupId, content, back);
    }
}
