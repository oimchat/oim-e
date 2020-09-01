import UserChatView from '@/app/com/main/module/business/chat/view/UserChatView';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/main/module/business/user/bean/User';
import Content from '@/app/com/common/chat/Content';
import userChatViewModel from '@/platform/vue/view/model/UserChatViewModel';
import ContactRelationBox from '@/app/com/main/module/business/contact/box/ContactRelationBox';
import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';
import ContactService from '@/app/com/main/module/business/contact/service/ContactService';


export default class UserChatViewImpl extends AbstractMaterial implements UserChatView {


    public setUser(user: User): void {
        userChatViewModel.setUser(user);
        let name = '';
        if (user) {
            const userId = user.id;
            const contactListBox: ContactRelationBox = this.appContext.getMaterial(ContactRelationBox);
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

    public isVisible(): boolean {
        // no
        return false;
    }

    public setVisible(visible: boolean): void {
        // no
    }
}
