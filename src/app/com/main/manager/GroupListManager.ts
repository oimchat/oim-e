import AbstractMaterial from '@/app/base/AbstractMaterial';
import GroupCategory from '@/app/com/bean/GroupCategory';
import GroupListBox from '@/app/com/main/box/GroupListBox';
import ViewEnum from '@/app/com/main/view/ViewEnum';
import ListPaneView from '@/app/com/main/view/ListPaneView';
import BaseUtil from '@/app/lib/util/BaseUtil';
import GroupInfoUtil from '@/app/com/main/util/GroupInfoUtil';
import GroupBox from '@/app/com/main/box/GroupBox';
import Group from '@/app/com/bean/Group';
import GroupRelation from '@/app/com/bean/GroupRelation';

export default class GroupListManager extends AbstractMaterial {


    /**
     * 重置分组成员
     *
     * @author XiaHui
     * @date 2017年9月5日 上午10:50:59
     */
    public setCategoryList(list: GroupCategory[]): void {
        const own = this;
        if (list) {
            const contactListBox: GroupListBox = this.appContext.getMaterial(GroupListBox);
            contactListBox.clearCategory();

            const listPaneView: ListPaneView = this.appContext.getView(ViewEnum.GroupListPaneView);
            listPaneView.clearCategory();

            if (list) {
                const length = list.length;
                for (let i = 0; i < length; i++) {
                    const category = list[i];
                    own.addOrUpdateGroupCategoryInfo(category);
                }
                own.updateAllCategoryMember();
                own.updateAllCategoryMemberCount();
            }
        }
    }

    public setGroupList(list: Group[]) {
        const groupBox: GroupBox = this.appContext.getMaterial(GroupBox);
        groupBox.putGroupList(list);
        if (list) {
            this.updateAllCategoryMember();
            this.updateAllCategoryMemberCount();
        }
    }


    public setRelationList(list: GroupRelation[]) {
        const contactListBox: GroupListBox = this.appContext.getMaterial(GroupListBox);
        contactListBox.clearGroupRelation();
        contactListBox.putGroupRelationList(list);
        if (list) {
            this.updateAllCategoryMember();
            this.updateAllCategoryMemberCount();
        }
    }

    public addOrUpdateGroupCategoryInfo(category: GroupCategory) {
        const contactListBox: GroupListBox = this.appContext.getMaterial(GroupListBox);
        contactListBox.putCategory(category);

        const categoryId = category.id;
        const name = category.name;

        const listPaneView: ListPaneView = this.appContext.getView(ViewEnum.GroupListPaneView);
        listPaneView.addOrUpdateCategory(categoryId, name, category.rank);
    }

    public updateCategoryName(categoryId: string, name: string) {
        const contactListBox: GroupListBox = this.appContext.getMaterial(GroupListBox);
        const category = contactListBox.getCategory(categoryId);
        if (category) {
            category.name = name;

            const listPaneView: ListPaneView = this.appContext.getView(ViewEnum.GroupListPaneView);
            listPaneView.addOrUpdateCategory(categoryId, name, category.rank);
        }
    }

    public deleteCategory(categoryId: string) {
        const contactListBox: GroupListBox = this.appContext.getMaterial(GroupListBox);
        contactListBox.removeCategory(categoryId);

        const listPaneView: ListPaneView = this.appContext.getView(ViewEnum.GroupListPaneView);
        listPaneView.removeCategory(categoryId);

        const defaultCategoryId = contactListBox.getDefaultCategoryId();
        const list = contactListBox.removeGroupRelationListByCategoryId(categoryId);
        if (list && '' !== defaultCategoryId) {
            for (const data of list) {
                data.categoryId = defaultCategoryId;
                contactListBox.putGroupRelation(data);
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
        const contactListBox: GroupListBox = this.appContext.getMaterial(GroupListBox);
        const list = contactListBox.getCategoryList();
        const length = list.length;
        for (let i = 0; i < length; i++) {
            const category = list[i];
            this.updateCategoryMember(category.id);
        }
    }

    public updateCategoryMember(categoryId: string): void {
        const listPaneView: ListPaneView = this.appContext.getView(ViewEnum.GroupListPaneView);
        listPaneView.clearCategoryMember(categoryId);
        const groupBox: GroupBox = this.appContext.getMaterial(GroupBox);
        const contactListBox: GroupListBox = this.appContext.getMaterial(GroupListBox);
        const list = contactListBox.getGroupRelationList(categoryId);
        if (!BaseUtil.isEmpty(list)) {
            const length = list.length;
            for (let i = 0; i < length; i++) {
                const relation = list[i];
                const group = groupBox.getGroup(relation.groupId);
                if (group) {
                    this.addOrUpdateGroupInfo(categoryId, relation, group);
                }
            }
        }
    }

    public updateAllCategoryMemberCount() {
        const contactListBox: GroupListBox = this.appContext.getMaterial(GroupListBox);
        const list = contactListBox.getCategoryList();

        const length = list.length;
        for (let i = 0; i < length; i++) {
            const category = list[i];
            this.updateCategoryMemberCount(category.id);
        }
    }

    public updateCategoryMemberCount(categoryId: string) {
        const groupBox: GroupBox = this.appContext.getMaterial(GroupBox);
        const contactListBox: GroupListBox = this.appContext.getMaterial(GroupListBox);
        const list = contactListBox.getGroupRelationList(categoryId);
        let totalCount = 0;
        const length = list.length;
        for (let i = 0; i < length; i++) {
            const relation = list[i];
            const group = groupBox.getGroup(relation.groupId);
            if (!BaseUtil.isEmpty(group)) {
                totalCount++;
            }
        }
        const countText = '[' + totalCount + ']';
        const listPaneView: ListPaneView = this.appContext.getView(ViewEnum.GroupListPaneView);
        listPaneView.updateCategoryMemberCount(categoryId, countText);
    }

    public addOrUpdateCategory(category: GroupCategory) {
        const categoryId = category.id;
        this.addOrUpdateGroupCategoryInfo(category);
        this.updateCategoryMember(categoryId);
        this.updateCategoryMemberCount(categoryId);
    }

    public addOrUpdate(group: Group, relation: GroupRelation) {
        this.addOrUpdateGroup(group);
        this.addOrUpdateRelation(relation);
    }

    public addOrUpdateGroup(group: Group) {
        if (group) {
            const groupBox: GroupBox = this.appContext.getMaterial(GroupBox);
            groupBox.putGroup(group);

            const groupId = group.id;
            const contactListBox: GroupListBox = this.appContext.getMaterial(GroupListBox);

            const list = contactListBox.getGroupInGroupRelationListByGroupId(groupId);

            if (list) {
                const length = list.length;
                for (let i = 0; i < length; i++) {
                    const relation = list[i];
                    if (relation) {
                        const categoryId = relation.categoryId;
                        this.addOrUpdateGroupInfo(categoryId, relation, group);
                        this.updateCategoryMemberCount(categoryId);
                    }
                }
            }
        }
    }


    public addOrUpdateRelation(relation: GroupRelation) {

        if (relation) {

            const groupBox: GroupBox = this.appContext.getMaterial(GroupBox);
            const contactListBox: GroupListBox = this.appContext.getMaterial(GroupListBox);

            const groupId = relation.groupId;
            const categoryId = relation.categoryId;

            const list: GroupRelation[] = contactListBox.getGroupInGroupRelationListByGroupId(groupId);

            if (list && list.length > 0) {
                for (const data of list) {
                    const cid = data.categoryId;
                    if (cid !== categoryId) {
                        contactListBox.removeGroupRelation(cid, groupId);
                        this.updateCategoryMemberCount(cid);
                    }
                }
            }

            contactListBox.putGroupRelation(relation);
            const group = groupBox.getGroup(groupId);
            if (group) {
                this.addOrUpdateGroupInfo(categoryId, relation, group);
                this.updateCategoryMemberCount(categoryId);
            }
        }
    }


    public updateRemarkName(groupId: string, remarkName: string) {
        const contactListBox: GroupListBox = this.appContext.getMaterial(GroupListBox);

        const list = contactListBox.getGroupInGroupRelationListByGroupId(groupId);
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

    public deleteGroup(groupId: string) {
        const contactListBox: GroupListBox = this.appContext.getMaterial(GroupListBox);
        const relationList = contactListBox.removeGroupRelationList(groupId);
        if (relationList) {
            const listPaneView: ListPaneView = this.appContext.getView(ViewEnum.GroupListPaneView);
            for (const data of relationList) {
                listPaneView.removeCategoryMember(data.categoryId, groupId);
            }
        }
    }


    public addOrUpdateGroupInfo(categoryId: string, relation: GroupRelation, group: Group) {
        if (relation && group) {

            const remarkName = relation.remark;
            const itemId = group.id;
            let showName = remarkName;

            if (BaseUtil.isEmpty(showName)) {
                showName = GroupInfoUtil.getShowName(group);
            }

            const avatar = GroupInfoUtil.getHeadImage(group);

            const gray = false;

            const listPaneView: ListPaneView = this.appContext.getView(ViewEnum.GroupListPaneView);
            listPaneView.addOrUpdateItem(categoryId, itemId, showName, avatar, gray);
        }
    }
}
