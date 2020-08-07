import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupCategory from '@/app/com/main/module/business/group/bean/GroupCategory';
import DataBackAction from '@/app/base/net/DataBackAction';
import PersonalBox from '@/app/com/main/module/business/personal/box/PersonalBox';
import GroupCategorySender from '@/app/com/main/module/business/group/sender/GroupCategorySender';
import Message from '@/app/base/message/Message';

export default class GroupCategoryController extends AbstractMaterial {
    public addCategory(name: string, back?: DataBackAction): void {
        const personalBox: PersonalBox = this.appContext.getMaterial(PersonalBox);
        const category: GroupCategory = new GroupCategory();
        category.name = name;
        category.userId = personalBox.getUserId();
        const groupCategorySender: GroupCategorySender = this.appContext.getMaterial(GroupCategorySender);
        groupCategorySender.addCategory(category, back);
    }

    public updateName(categoryId: string, name: string, back?: DataBackAction, parallel?: boolean): void {
        const groupCategorySender: GroupCategorySender = this.appContext.getMaterial(GroupCategorySender);
        groupCategorySender.updateName(categoryId, name, back, parallel);
    }

    public updateSort(categoryId: string, sort: number, back?: DataBackAction, parallel?: boolean): void {
        const groupCategorySender: GroupCategorySender = this.appContext.getMaterial(GroupCategorySender);
        groupCategorySender.updateSort(categoryId, sort, back, parallel);
    }

    public delete(categoryId: string, back?: DataBackAction, parallel?: boolean): void {
        const groupCategorySender: GroupCategorySender = this.appContext.getMaterial(GroupCategorySender);
        groupCategorySender.delete(categoryId, back, parallel);
    }
}
