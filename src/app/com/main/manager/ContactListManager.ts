import AbstractMaterial from '@/app/base/AbstractMaterial';
import ContactCategory from '@/app/com/bean/ContactCategory';
import ContactListBox from '@/app/com/main/box/ContactListBox';
import ViewEnum from '@/app/com/main/view/ViewEnum';
import ListPaneView from '@/app/com/main/view/ListPaneView';
import BaseUtil from '@/app/lib/util/BaseUtil';
import UserInfoUtil from '@/app/com/main/util/UserInfoUtil';
import UserBox from '@/app/com/main/box/UserBox';
import User from '@/app/com/bean/User';
import ContactRelation from '@/app/com/bean/ContactRelation';

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
            const contactListBox: ContactListBox = this.appContext.getMaterial(ContactListBox);
            contactListBox.clearCategory();

            const listPaneView: ListPaneView = this.appContext.getView(ViewEnum.ContactListPaneView);
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
        const contactListBox: ContactListBox = this.appContext.getMaterial(ContactListBox);
        contactListBox.clearContactRelation();
        contactListBox.putContactRelationList(list);
        if (list) {
            this.updateAllCategoryMember();
            this.updateAllCategoryMemberCount();
        }
    }

    public addOrUpdateContactCategoryInfo(category: ContactCategory) {
        const contactListBox: ContactListBox = this.appContext.getMaterial(ContactListBox);
        contactListBox.putCategory(category);

        const categoryId = category.id;
        const name = category.name;
        const rank = category.rank;

        const listPaneView: ListPaneView = this.appContext.getView(ViewEnum.ContactListPaneView);
        listPaneView.addOrUpdateCategory(categoryId, name, rank);
    }

    public updateCategoryName(categoryId: string, name: string) {
        const contactListBox: ContactListBox = this.appContext.getMaterial(ContactListBox);
        const category = contactListBox.getCategory(categoryId);
        if (category) {
            category.name = name;
            const listPaneView: ListPaneView = this.appContext.getView(ViewEnum.ContactListPaneView);
            listPaneView.addOrUpdateCategory(categoryId, name, category.rank);
        }
    }

    public deleteCategory(categoryId: string) {
        const contactListBox: ContactListBox = this.appContext.getMaterial(ContactListBox);
        contactListBox.removeCategory(categoryId);

        const listPaneView: ListPaneView = this.appContext.getView(ViewEnum.ContactListPaneView);
        listPaneView.removeCategory(categoryId);

        const defaultCategoryId = contactListBox.getDefaultCategoryId();
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
        const contactListBox: ContactListBox = this.appContext.getMaterial(ContactListBox);
        const list = contactListBox.getCategoryList();
        const length = list.length;
        for (let i = 0; i < length; i++) {
            const category = list[i];
            this.updateCategoryMember(category.id);
        }
    }

    public updateCategoryMember(categoryId: string): void {
        const listPaneView: ListPaneView = this.appContext.getView(ViewEnum.ContactListPaneView);
        listPaneView.clearCategoryMember(categoryId);
        const userBox: UserBox = this.appContext.getMaterial(UserBox);
        const contactListBox: ContactListBox = this.appContext.getMaterial(ContactListBox);
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
        const contactListBox: ContactListBox = this.appContext.getMaterial(ContactListBox);
        const list = contactListBox.getCategoryList();

        const length = list.length;
        for (let i = 0; i < length; i++) {
            const category = list[i];
            this.updateCategoryMemberCount(category.id);
        }
    }

    public updateCategoryMemberCount(categoryId: string) {
        const userBox: UserBox = this.appContext.getMaterial(UserBox);
        const contactListBox: ContactListBox = this.appContext.getMaterial(ContactListBox);
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
        const listPaneView: ListPaneView = this.appContext.getView(ViewEnum.ContactListPaneView);
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
            const contactListBox: ContactListBox = this.appContext.getMaterial(ContactListBox);

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
            const contactListBox: ContactListBox = this.appContext.getMaterial(ContactListBox);

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
        const contactListBox: ContactListBox = this.appContext.getMaterial(ContactListBox);

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
        const contactListBox: ContactListBox = this.appContext.getMaterial(ContactListBox);
        const relationList = contactListBox.removeContactRelationList(userId);
        if (relationList) {
            const listPaneView: ListPaneView = this.appContext.getView(ViewEnum.ContactListPaneView);
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

            const listPaneView: ListPaneView = this.appContext.getView(ViewEnum.ContactListPaneView);
            listPaneView.addOrUpdateItem(categoryId, itemId, showName, avatar, gray);
        }
    }
}
