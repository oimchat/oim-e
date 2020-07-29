import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Page from '@/app/com/data/common/Page';
import ContactRelationSender from '@/app/com/main/sender/ContactRelationSender';

export default class ContactRelationHandler extends AbstractMaterial {

    public loadAllList(): void {
        const own = this;
        const sender: ContactRelationSender = this.appContext.getMaterial(ContactRelationSender);
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
        const sender: ContactRelationSender = this.appContext.getMaterial(ContactRelationSender);
        for (let i = 0; i < totalPage; i++) {
            page.number = (i + 1);
            sender.getList(page);
        }
    }
}
