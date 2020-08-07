import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Page from '@/app/com/common/data/Page';
import GroupRelationSender from '@/app/com/main/module/business/group/sender/GroupRelationSender';

export default class GroupRelationHandler extends AbstractMaterial {

    public loadAllList(): void {
        const own = this;
        const sender: GroupRelationSender = this.appContext.getMaterial(GroupRelationSender);
        const dataBack = this.appContext.createDataBackAction((data: any) => {
            if (data.body && data.body.count) {
                const count: number = data.body.count;
                own.loadListByCount(count);
            }
        });
        sender.getCount(dataBack);
    }

    public loadListByCount(count: number): void {
        const page: Page = new Page();
        page.setTotalCount(count);
        const totalPage = page.getTotalPage();
        const sender: GroupRelationSender = this.appContext.getMaterial(GroupRelationSender);
        for (let i = 0; i < totalPage; i++) {
            page.number = (i + 1);
            sender.getList(page);
        }
    }
}
