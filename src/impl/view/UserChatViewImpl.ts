import UserChatView from '@/app/com/main/view/UserChatView';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/bean/User';
import Content from '@/app/com/data/chat/content/Content';
import userChatViewModel from '@/impl/data/UserChatViewModel';
import ContactListBox from '@/app/com/main/box/ContactListBox';
import UserInfoUtil from '@/app/com/main/util/UserInfoUtil';
import ContactService from '@/app/com/main/service/ContactService';

export default class UserChatViewImpl extends AbstractMaterial implements UserChatView {

    public setUser(user: User): void {
        userChatViewModel.setUser(user);
        let name = '';
        if (user) {
            const userId = user.id;
            const contactListBox: ContactListBox = this.appContext.getMaterial(ContactListBox);
            const list = contactListBox.getContactInContactRelationListByUserId(userId);

            if (list && list.length > 0) {
                const relation = list[0];
                name = relation.remark;
            }

            if (!name || '' === name) {
                name = UserInfoUtil.getShowName(user);
            }
        }
        userChatViewModel.setName(name);
    }

    public chat(isReceive: boolean, isOwn: boolean, showUser: User, chatUser: User, content: Content): void {
        const userId = showUser.id;
        const contactService: ContactService = this.appContext.getMaterial(ContactService);
        const name = contactService.getShowName(chatUser);
        userChatViewModel.insertLast(isReceive, isOwn, userId, name, chatUser, content);
    }


    public insertBefore(isReceive: boolean, isOwn: boolean, key: string, chatUser: User, content: Content): void {
        const contactService: ContactService = this.appContext.getMaterial(ContactService);
        const name = contactService.getShowName(chatUser);
        userChatViewModel.insertBefore(isReceive, isOwn, key, name, chatUser, content);
    }

    public insertLast(isReceive: boolean, isOwn: boolean, key: string, chatUser: User, content: Content): void {
        const contactService: ContactService = this.appContext.getMaterial(ContactService);
        const name = contactService.getShowName(chatUser);
        userChatViewModel.insertLast(isReceive, isOwn, key, name, chatUser, content);
    }

    public isShowing(key: string): boolean {
        const showing = (userChatViewModel.getChatKey() === key);
        return showing;
    }
}
