import User from '@/app/com/main/module/business/user/bean/User';
import Content from '@/app/com/common/chat/Content';
import Group from '@/app/com/main/module/business/group/bean/Group';
import VisibleView from '@/app/com/client/common/view/VisibleView';

export default interface GroupChatView extends VisibleView {

    setGroup(group: Group): void;

    insertBefore(isReceive: boolean, isOwn: boolean, key: string, chatUser: User, content: Content): void;

    insertLast(isReceive: boolean, isOwn: boolean, key: string, chatUser: User, content: Content): void;

    isShowing(key: string): boolean;
}
