import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import ListPaneView from '@/app/com/client/common/view/ListPaneView';
import ListBox from '@/platform/vue/view/data/ListBox';

export default abstract class AbstractListPaneView extends AbstractMaterial implements ListPaneView {

    protected listBox: ListBox = new ListBox();

    public addOrUpdateCategory(categoryId: string, name: string, sort: number): void {
        this.listBox.addOrUpdateNode(categoryId, name);
    }

    public removeCategory(categoryId: string): void {
        this.listBox.deleteNode(categoryId);
    }

    public addOrUpdateItem(categoryId: string, itemId: string, name: string, avatar: string, gray: boolean): void {
        this.listBox.addOrUpdateItem(categoryId, itemId, name, avatar, gray);
    }

    public clearCategory(): void {
        this.listBox.clearNode();
    }

    public clearCategoryMember(categoryId: string): void {
        this.listBox.clearItems(categoryId);
    }

    public isCategoryShowing(categoryId: string): boolean {
        return this.listBox.isNodeShowing(categoryId);
    }

    public isItemShowing(categoryId: string, itemId: string): boolean {
        const showing = this.listBox.isNodeShowing(categoryId);
        return showing;
    }

    public removeCategoryMember(categoryId: string, itemId: string): void {
        this.listBox.deleteItem(categoryId, itemId);
    }

    public setCategoryRed(categoryId: string, red: boolean, count: number): void {
        this.listBox.setNodeRed(categoryId, red, count);
    }

    public setItemRed(categoryId: string, itemId: string, red: boolean, count: number): void {
        this.listBox.setItemRed(categoryId, itemId, red, count);
    }

    public updateCategoryMemberCount(categoryId: string, countText: string): void {
        this.listBox.updateNodeCount(categoryId, countText);
    }

    public  updateItemText(categoryId: string, itemId: string, text: string, time: string): void {
        this.listBox.updateItemText(categoryId, itemId, text, time);
    }
}
