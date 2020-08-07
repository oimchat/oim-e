import ListPaneView from '@/app/com/client/common/view/ListPaneView';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';

export default class GroupListPaneViewDefaultImpl extends AbstractMaterial implements ListPaneView {

    public addOrUpdateCategory(categoryId: string, name: string, sort: number): void {
        // no
    }

    public addOrUpdateItem(categoryId: string, itemId: string, name: string, avatar: string, gray: boolean): void {
        // no
    }

    public clearCategory(): void {
        // no
    }

    public clearCategoryMember(categoryId: string): void {
        // no
    }

    public isCategoryShowing(categoryId: string): boolean {
        return false;
    }

    public isItemShowing(categoryId: string, itemId: string): boolean {
        return false;
    }

    public removeCategory(categoryId: string): void {
        // no
    }

    public removeCategoryMember(categoryId: string, itemId: string): void {
        // no
    }

    public setCategoryRed(categoryId: string, red: boolean, count: number): void {
        // no
    }

    public setItemRed(categoryId: string, itemId: string, red: boolean, count: number): void {
        // no
    }

    public updateCategoryMemberCount(categoryId: string, countText: string): void {
        // no
    }

    public updateItemText(categoryId: string, itemId: string, text: string, time: string): void {
        // no
    }
}
