import {MethodMapping} from '@/app/base/action/annotation/ActionDecorator';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import GroupCategory from '@/app/com/main/module/business/group/bean/GroupCategory';
import GroupCategoryService from '@/app/com/main/module/business/group/service/GroupCategoryService';

export default class GroupCategoryAction extends AbstractMaterial {

    private static action: string = '1.3.002';

    /*********************************** back **********************************************/
    @MethodMapping(GroupCategoryAction, GroupCategoryAction.action, '1.1.0002')
    public setList(data: any): void {
        if (data && data.body) {
            const list: GroupCategory[] = data.body.items;
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
            const categoryId: string = data.body.id;
            if (categoryId) {
                const ccs: GroupCategoryService = this.appContext.getMaterial(GroupCategoryService);
                ccs.addById(categoryId);
            }
        }
    }

    @MethodMapping(GroupCategoryAction, GroupCategoryAction.action, '1.2.0003')
    public updateName(data: any): void {
        if (data && data.body) {
            const categoryId: string = data.body.id;
            const name: string = data.body.name;
            if (categoryId) {
                const ccs: GroupCategoryService = this.appContext.getMaterial(GroupCategoryService);
                ccs.updateName(categoryId, name);
            }
        }
    }

    @MethodMapping(GroupCategoryAction, GroupCategoryAction.action, '1.2.0004')
    public updateSort(data: any): void {
        const ccs: GroupCategoryService = this.appContext.getMaterial(GroupCategoryService);
        ccs.updateSort();
    }

    @MethodMapping(GroupCategoryAction, GroupCategoryAction.action, '1.2.0005')
    public delete(data: any): void {
        if (data && data.body) {
            const categoryId: string = data.body.id;
            if (categoryId) {
                const ccs: GroupCategoryService = this.appContext.getMaterial(GroupCategoryService);
                ccs.delete(categoryId);
            }
        }
    }
}

