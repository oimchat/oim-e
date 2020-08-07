import Group from '@/app/com/main/module/business/group/bean/Group';
import Content from '@/app/com/common/chat/Content';
import GroupChatView from '@/app/com/main/module/business/chat/view/GroupChatView';
import User from '@/app/com/main/module/business/user/bean/User';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';

export default class GroupChatViewDefaultImpl extends AbstractMaterial implements GroupChatView {

    public setGroup(group: Group): void {
        // no
    }

    public chat(isReceive: boolean, isOwn: boolean, group: Group, chatUser: User, content: Content): void {
        // no
    }

    public insertBefore(isReceive: boolean, isOwn: boolean, key: string, chatUser: User, content: Content): void {
        // no
    }

    public insertLast(isReceive: boolean, isOwn: boolean, key: string, chatUser: User, content: Content): void {
        // no
    }

    public isShowing(key: string): boolean {
        return false;
    }

    public isVisible(): boolean {
        return false;
    }

    public setVisible(visible: boolean): void {
        // no
    }
}
