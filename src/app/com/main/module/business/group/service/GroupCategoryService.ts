import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupCategory from '@/app/com/main/module/business/group/bean/GroupCategory';
import GroupListManager from '@/app/com/main/module/business/group/manager/GroupListManager';
import DataBackAction from '@/app/base/net/DataBackAction';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import GroupCategorySender from '@/app/com/main/module/business/group/sender/GroupCategorySender';
import GroupCategoryHandler from '@/app/com/main/module/business/group/handler/GroupCategoryHandler';


export default class GroupCategoryService extends AbstractMaterial {

    public setList(list: GroupCategory[]): void {
        if (list) {
            const ccm: GroupListManager = this.appContext.getMaterial(GroupListManager);
            ccm.setCategoryList(list);
        }
    }

    public addById(categoryId: string) {
        const own = this;
        if (categoryId) {
            const back: DataBackAction = {
                back(data: any): void {
                    if (data && data.body) {
                        const category: GroupCategory = data.body;
                        if (category) {
                            own.add(category);
                        }
                    }
                },
            } as AbstractDataBackAction;
            const groupCategorySender: GroupCategorySender = this.appContext.getMaterial(GroupCategorySender);
            groupCategorySender.getCategory(categoryId, back);
        }
    }

    public add(category: GroupCategory): void {
        if (category) {
            const ccm: GroupListManager = this.appContext.getMaterial(GroupListManager);
            ccm.addOrUpdateCategory(category);
        }
    }

    public updateName(categoryId: string, name: string) {
        if (categoryId) {
            const ccm: GroupListManager = this.appContext.getMaterial(GroupListManager);
            ccm.updateCategoryName(categoryId, name);
        }
    }

    public updateSort() {
        const handler: GroupCategoryHandler = this.appContext.getMaterial(GroupCategoryHandler);
        handler.loadAllList();
    }

    public delete(categoryId: string) {
        const ccm: GroupListManager = this.appContext.getMaterial(GroupListManager);
        ccm.deleteCategory(categoryId);
    }
}
