import {MethodMapping} from '@/app/base/annotation/ActionDecorator';
import AbstractMaterial from '@/app/base/AbstractMaterial';
import GroupCategory from '@/app/com/bean/GroupCategory';
import GroupCategoryService from '@/app/com/main/service/GroupCategoryService';

export default class GroupCategoryAction extends AbstractMaterial {

    private static action: string = '1.2.202';

    /*********************************** back **********************************************/
    @MethodMapping(GroupCategoryAction, GroupCategoryAction.action, '1.1.0002')
    public setList(data: any): void {
        if (data && data.body) {
            const list: GroupCategory[] = data.body.list;
            if (list) {
                const ccs: GroupCategoryService = this.appContext.getMaterial(GroupCategoryService);
                ccs.setList(list);
            }
        }
    }

    /*********************************** push **********************************************/
    @MethodMapping(GroupCategoryAction, GroupCategoryAction.action, '1.2.0001')
    public add(data: any): void {
        if (data && data.body) {
            const categoryId: string = data.body.categoryId;
            if (categoryId) {
                const ccs: GroupCategoryService = this.appContext.getMaterial(GroupCategoryService);
                ccs.addById(categoryId);
            }
        }
    }

    @MethodMapping(GroupCategoryAction, GroupCategoryAction.action, '1.2.0003')
    public updateName(data: any): void {
        if (data && data.body) {
            const categoryId: string = data.body.categoryId;
            const name: string = data.body.name;
            if (categoryId) {
                const ccs: GroupCategoryService = this.appContext.getMaterial(GroupCategoryService);
                ccs.updateName(categoryId, name);
            }
        }
    }

    @MethodMapping(GroupCategoryAction, GroupCategoryAction.action, '1.2.0004')
    public updateRank(data: any): void {
        const ccs: GroupCategoryService = this.appContext.getMaterial(GroupCategoryService);
        ccs.updateRank();
    }

    @MethodMapping(GroupCategoryAction, GroupCategoryAction.action, '1.2.0005')
    public delete(data: any): void {
        if (data && data.body) {
            const categoryId: string = data.body.categoryId;
            if (categoryId) {
                const ccs: GroupCategoryService = this.appContext.getMaterial(GroupCategoryService);
                ccs.delete(categoryId);
            }
        }
    }
}

