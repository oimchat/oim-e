import View from '@/app/com/client/common/view/View';

export default interface ListPaneView extends View {

    clearCategory(): void;

    addOrUpdateCategory(categoryId: string, name: string, sort: number): void;

    removeCategory(categoryId: string): void;

    clearCategoryMember(categoryId: string): void;

    addOrUpdateItem(categoryId: string, itemId: string, name: string, avatar: string, gray: boolean): void;

    removeCategoryMember(categoryId: string, itemId: string): void;

    updateCategoryMemberCount(categoryId: string, countText: string): void;

    setCategoryRed(categoryId: string, red: boolean, count: number): void;

    setItemRed(categoryId: string, itemId: string, red: boolean, count: number): void;

    isCategoryShowing(categoryId: string): boolean;

    isItemShowing(categoryId: string, itemId: string): boolean;

    updateItemText(categoryId: string, itemId: string, text: string, time: string): void;

}
