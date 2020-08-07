import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/main/module/business/user/bean/User';
import UserBox from '@/app/com/main/module/business/user/box/UserBox';
import ContactListBox from '@/app/com/main/module/business/contact/box/ContactListBox';
import BaseUtil from '@/app/lib/util/BaseUtil';
import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';

export default class ContactManager extends AbstractMaterial {

    public getShowNameById(userId: string): string {
        const userBox: UserBox = this.appContext.getMaterial(UserBox);
        return this.getShowName(userBox.getUser(userId));
    }

    public getShowName(user: User): string {
        let name = '';
        if (user) {
            const userId: string = user.id;
            const contactListBox: ContactListBox = this.appContext.getMaterial(ContactListBox);
            const relation = contactListBox.getContactRelationByUserId(userId);
            if (relation) {
                name = relation.remark;
            }
            if (BaseUtil.isEmpty(name)) {
                name = UserInfoUtil.getShowName(user);
            }
        }
        return name;
    }
}
