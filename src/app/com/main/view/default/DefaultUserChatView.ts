import UserChatView from '@/app/com/main/module/business/chat/view/UserChatView';
import User from '@/app/com/main/module/business/user/bean/User';
import Content from '@/app/com/common/chat/Content';


export default class DefaultUserChatView implements UserChatView {

    public insertBefore(isReceive: boolean, isOwn: boolean, key: string, chatUser: User, content: Content): void {
        // no
    }

    public insertLast(isReceive: boolean, isOwn: boolean, key: string, chatUser: User, content: Content): void {
        // no
    }

    public setUser(user: User): void {
        // no
    }

    public isShowing(key: string): boolean {
        return false;
    }
}
