import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import ContactCategory from '@/app/com/main/module/business/contact/bean/ContactCategory';
import ContactRelationBox from '@/app/com/main/module/business/contact/box/ContactRelationBox';
import WorkViewEnum from '@/app/com/common/view/WorkViewEnum';
import ListPaneView from '@/app/com/client/common/view/ListPaneView';
import BaseUtil from '@/app/lib/util/BaseUtil';
import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';
import UserBox from '@/app/com/main/module/business/user/box/UserBox';
import User from '@/app/com/main/module/business/user/bean/User';
import ContactRelation from '@/app/com/main/module/business/contact/bean/ContactRelation';
import ContactCategoryBox from '@/app/com/main/module/business/contact/box/ContactCategoryBox';

export default class ContactListManager extends AbstractMaterial {


    /**
     * 重置分组成员
     *
     * @author XiaHui
     * @date 2017年9月5日 上午10:50:59
     */
    public setCategoryList(list: ContactCategory[]): void {
        const own = this;
        if (list) {
            const contactListBox: ContactCategoryBox = this.appContext.getMaterial(ContactCategoryBox);
            contactListBox.clearCategory();

            const listPaneView: ListPaneView = this.appContext.getView(WorkViewEnum.ContactListPaneView);
            listPaneView.clearCategory();

            if (list) {
                const length = list.length;
                for (let i = 0; i < length; i++) {
                    const category = list[i];
                    own.addOrUpdateContactCategoryInfo(category);
                }
                own.updateAllCategoryMember();
                own.updateAllCategoryMemberCount();
            }
        }
    }

    public setUserList(list: User[]) {
        const userBox: UserBox = this.appContext.getMaterial(UserBox);
        userBox.putUserList(list);
        if (list) {
            this.updateAllCategoryMember();
            this.updateAllCategoryMemberCount();
        }
    }


    public setRelationList(list: ContactRelation[]) {
        const contactListBox: ContactRelationBox = this.appContext.getMaterial(ContactRelationBox);
        contactListBox.clearContactRelation();
        contactListBox.putContactRelationList(list);
        if (list) {
            this.updateAllCategoryMember();
            this.updateAllCategoryMemberCount();
        }
    }

    public addOrUpdateContactCategoryInfo(category: ContactCategory) {
        const contactListBox: ContactCategoryBox = this.appContext.getMaterial(ContactCategoryBox);
        contactListBox.putCategory(category);

        const categoryId = category.id;
        const name = category.name;
        const sort = category.sort;

        const listPaneView: ListPaneView = this.appContext.getView(WorkViewEnum.ContactListPaneView);
        listPaneView.addOrUpdateCategory(categoryId, name, sort);
    }

    public updateCategoryName(categoryId: string, name: string) {
        const contactListBox: ContactCategoryBox = this.appContext.getMaterial(ContactCategoryBox);
        const category = contactListBox.getCategory(categoryId);
        if (category) {
            category.name = name;
            const listPaneView: ListPaneView = this.appContext.getView(WorkViewEnum.ContactListPaneView);
            listPaneView.addOrUpdateCategory(categoryId, name, category.sort);
        }
    }

    public deleteCategory(categoryId: string) {

        const contactCategoryBox: ContactCategoryBox = this.appContext.getMaterial(ContactCategoryBox);
        const contactListBox: ContactRelationBox = this.appContext.getMaterial(ContactRelationBox);
        contactCategoryBox.removeCategory(categoryId);

        const listPaneView: ListPaneView = this.appContext.getView(WorkViewEnum.ContactListPaneView);
        listPaneView.removeCategory(categoryId);

        const defaultCategoryId = contactCategoryBox.getDefaultCategoryId();
        const list = contactListBox.removeContactRelationListByCategoryId(categoryId);

        if (list && '' !== defaultCategoryId) {
            for (const data of list) {
                data.categoryId = defaultCategoryId;
                contactListBox.putContactRelation(data);
            }
            this.updateCategoryMember(defaultCategoryId);
            this.updateCategoryMemberCount(defaultCategoryId);
        }
    }

    /**
     * 重置分组成员
     *
     * @author XiaHui
     */
    public updateAllCategoryMember() {
        const contactListBox: ContactCategoryBox = this.appContext.getMaterial(ContactCategoryBox);
        const list = contactListBox.getCategoryList();
        const length = list.length;
        for (let i = 0; i < length; i++) {
            const category = list[i];
            this.updateCategoryMember(category.id);
        }
    }

    public updateCategoryMember(categoryId: string): void {
        const listPaneView: ListPaneView = this.appContext.getView(WorkViewEnum.ContactListPaneView);
        listPaneView.clearCategoryMember(categoryId);
        const userBox: UserBox = this.appContext.getMaterial(UserBox);
        const contactListBox: ContactRelationBox = this.appContext.getMaterial(ContactRelationBox);
        const list = contactListBox.getContactRelationList(categoryId);
        if (!BaseUtil.isEmpty(list)) {
            const length = list.length;
            for (let i = 0; i < length; i++) {
                const relation = list[i];
                const user = userBox.getUser(relation.contactUserId);
                if (user) {
                    this.addOrUpdateContactInfo(categoryId, relation, user);
                }
            }
        }
    }

    public updateAllCategoryMemberCount() {
        const contactListBox: ContactCategoryBox = this.appContext.getMaterial(ContactCategoryBox);
        const list = contactListBox.getCategoryList();

        const length = list.length;
        for (let i = 0; i < length; i++) {
            const category = list[i];
            this.updateCategoryMemberCount(category.id);
        }
    }

    public updateCategoryMemberCount(categoryId: string) {
        const userBox: UserBox = this.appContext.getMaterial(UserBox);
        const contactListBox: ContactRelationBox = this.appContext.getMaterial(ContactRelationBox);
        const list = contactListBox.getContactRelationList(categoryId);
        let totalCount = 0;
        let onlineCount = 0;
        const length = list.length;
        for (let i = 0; i < length; i++) {
            const relation = list[i];
            const user = userBox.getUser(relation.contactUserId);
            if (!BaseUtil.isEmpty(user)) {
                totalCount++;
                if (!UserInfoUtil.isOffline(user.status)) {
                    onlineCount++;
                }
            }
        }
        const countText = '[' + onlineCount + '/' + totalCount + ']';
        const listPaneView: ListPaneView = this.appContext.getView(WorkViewEnum.ContactListPaneView);
        listPaneView.updateCategoryMemberCount(categoryId, countText);
    }

    public addOrUpdateCategory(category: ContactCategory) {
        const categoryId = category.id;
        this.addOrUpdateContactCategoryInfo(category);
        this.updateCategoryMember(categoryId);
        this.updateCategoryMemberCount(categoryId);
    }

    public addOrUpdate(user: User, relation: ContactRelation) {
        this.addOrUpdateUser(user);
        this.addOrUpdateRelation(relation);
    }

    public addOrUpdateUser(user: User) {
        if (user) {
            const userBox: UserBox = this.appContext.getMaterial(UserBox);
            userBox.putUser(user);

            const userId = user.id;
            const contactListBox: ContactRelationBox = this.appContext.getMaterial(ContactRelationBox);

            const list = contactListBox.getContactInContactRelationListByUserId(userId);

            if (list) {
                const length = list.length;
                for (let i = 0; i < length; i++) {
                    const relation = list[i];
                    if (relation) {
                        const categoryId = relation.categoryId;
                        this.addOrUpdateContactInfo(categoryId, relation, user);
                        this.updateCategoryMemberCount(categoryId);
                    }
                }
            }
        }
    }


    public addOrUpdateRelation(relation: ContactRelation) {

        if (relation) {

            const userBox: UserBox = this.appContext.getMaterial(UserBox);
            const contactListBox: ContactRelationBox = this.appContext.getMaterial(ContactRelationBox);

            const contactUserId = relation.contactUserId;
            const categoryId = relation.categoryId;

            const list: ContactRelation[] = contactListBox.getContactInContactRelationListByUserId(contactUserId);

            if (list && list.length > 0) {
                for (const data of list) {
                    const cid = data.categoryId;
                    if (cid !== categoryId) {
                        contactListBox.removeContactRelation(cid, contactUserId);
                        this.updateCategoryMemberCount(cid);
                    }
                }
            }

            contactListBox.putContactRelation(relation);
            const user = userBox.getUser(contactUserId);
            if (user) {
                this.addOrUpdateContactInfo(categoryId, relation, user);
                this.updateCategoryMemberCount(categoryId);
            }
        }
    }


    public updateRemarkName(userId: string, remarkName: string) {
        const contactListBox: ContactRelationBox = this.appContext.getMaterial(ContactRelationBox);

        const list = contactListBox.getContactInContactRelationListByUserId(userId);
        if (list) {
            const length = list.length;
            for (let i = 0; i < length; i++) {
                const relation = list[i];
                if (relation) {
                    relation.remark = remarkName;
                    this.addOrUpdateRelation(relation);
                }
            }
        }
    }

    public deleteUser(userId: string) {
        const contactListBox: ContactRelationBox = this.appContext.getMaterial(ContactRelationBox);
        const relationList = contactListBox.removeContactRelationList(userId);
        if (relationList) {
            const listPaneView: ListPaneView = this.appContext.getView(WorkViewEnum.ContactListPaneView);
            for (const data of relationList) {
                listPaneView.removeCategoryMember(data.categoryId, userId);
            }
        }
    }


    public addOrUpdateContactInfo(categoryId: string, relation: ContactRelation, user: User) {
        if (relation && user) {


            // let nickname = user.nickname;
            // let name = user.name;
            // let account = user.account;
            // let userHead = user.head;

            const remarkName = relation.remark;
            const itemId = user.id;
            let showName = remarkName;

            if (BaseUtil.isEmpty(showName)) {
                showName = UserInfoUtil.getShowName(user);
            }

            const avatar = UserInfoUtil.getHeadImage(user);

            const status = user.status;
            const gray = UserInfoUtil.isOffline(status);
            const signature = user.signature;

            const listPaneView: ListPaneView = this.appContext.getView(WorkViewEnum.ContactListPaneView);
            listPaneView.addOrUpdateItem(categoryId, itemId, showName, avatar, gray);
            listPaneView.updateItemText(categoryId, itemId, signature, '');
        }
    }
}
