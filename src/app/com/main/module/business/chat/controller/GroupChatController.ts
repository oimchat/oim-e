import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Content from '@/app/com/common/chat/Content';
import DataBackAction from '@/app/base/net/DataBackAction';
import GroupChatSender from '@/app/com/main/module/business/chat/sender/GroupChatSender';
import PersonalBox from '@/app/com/main/module/business/personal/box/PersonalBox';
import User from "@/app/com/main/module/business/user/bean/User";
import AvatarCheckUtil from "@/app/com/main/common/util/AvatarCheckUtil";
import UserBase from "@/app/com/main/module/business/user/bean/UserBase";
import ObjectUtil from "@/app/common/util/ObjectUtil";

export default class GroupChatController extends AbstractMaterial {

    public chat(groupId: string, content: Content, back?: DataBackAction): void {
        const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
        const groupChatSender: GroupChatSender = this.appContext.getMaterial(GroupChatSender);
        const u: User = pb.getUser();
        const isNetAvatar = AvatarCheckUtil.isNetAvatar(u.avatar);
        const ub: UserBase = new UserBase();
        ObjectUtil.copyByTargetKey(ub, u);
        if (!isNetAvatar) {
            ub.avatar = '';
        }
        groupChatSender.chat(pb.getUserId(), ub, groupId, content, back);
    }
}
