import View from '@/app/com/main/view/View';
import User from '@/app/com/bean/User';
import Content from '@/app/com/data/chat/content/Content';
import Group from '@/app/com/bean/Group';

export default interface GroupChatView extends View {

    setGroup(group: Group): void;

    insertBefore(isReceive: boolean, isOwn: boolean, key: string, chatUser: User, content: Content): void;

    insertLast(isReceive: boolean, isOwn: boolean, key: string, chatUser: User, content: Content): void;

    isShowing(key: string): boolean;
}
