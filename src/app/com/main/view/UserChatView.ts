import View from '@/app/com/main/view/View';
import User from '@/app/com/bean/User';
import Content from '@/app/com/data/chat/content/Content';

export default interface UserChatView extends View {

    setUser(user: User): void;

    insertBefore(isReceive: boolean, isOwn: boolean, key: string, chatUser: User, content: Content): void;

    insertLast(isReceive: boolean, isOwn: boolean, key: string, chatUser: User, content: Content): void;

    isShowing(key: string): boolean;
}
