import UserChatView from '@/app/com/main/module/business/chat/view/UserChatView';
import User from '@/app/com/main/module/business/user/bean/User';
import Content from '@/app/com/common/chat/Content';
import userChatViewModel from '@/platform/vue/view/model/UserChatViewModel';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';

export default class UserChatViewDefaultImpl extends AbstractMaterial implements UserChatView {

    public setUser(user: User): void {
        // no
    }

    public chat(isReceive: boolean, isOwn: boolean, showUser: User, chatUser: User, content: Content): void {
        // no
    }


    public insertBefore(isReceive: boolean, isOwn: boolean, key: string, chatUser: User, content: Content): void {
        // no
    }

    public insertLast(isReceive: boolean, isOwn: boolean, key: string, chatUser: User, content: Content): void {
        // no
    }

    public isShowing(key: string): boolean {
        const showing = (userChatViewModel.getChatKey() === key);
        return false;
    }


    public isVisible(): boolean {
        return false;
    }

    public setVisible(visible: boolean): void {
        // no
    }
}
