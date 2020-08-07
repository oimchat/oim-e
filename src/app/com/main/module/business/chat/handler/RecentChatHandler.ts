import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import RecentChatSender from '@/app/com/main/module/business/chat/sender/RecentChatSender';
import Page from '@/app/com/common/data/Page';
import RecentChatQuery from '@/app/com/main/module/business/chat/data/RecentChatQuery';
import RecentChat from '@/app/com/main/module/business/chat/bean/RecentChat';

export default class RecentChatHandler extends AbstractMaterial {

    public loadAllList(): void {
        const own = this;
        const sender: RecentChatSender = this.appContext.getMaterial(RecentChatSender);
        const dataBack = this.appContext.createDataBackAction((data: any) => {
            if (data.body && data.body.count) {
                const count: number = data.body.count;
                own.loadListByCount(count);
            }
        });
        const query: RecentChatQuery = new RecentChatQuery();
        sender.queryCount(query, dataBack);
    }

    public loadListByCount(count: number): void {
        const query: RecentChatQuery = new RecentChatQuery();
        const page: Page = new Page();
        page.setTotalCount(count);
        const totalPage = page.getTotalPage();
        const sender: RecentChatSender = this.appContext.getMaterial(RecentChatSender);
        for (let i = 0; i < totalPage; i++) {
            page.number = (i + 1);
            sender.queryList(query, page);
        }
    }

    public getListByCount(count: number, back: (success: boolean, list: RecentChat[], message?: string) => void): void {
        const query: RecentChatQuery = new RecentChatQuery();
        const page: Page = new Page();
        page.setTotalCount(count);
        const totalPage = page.getTotalPage();
        const sender: RecentChatSender = this.appContext.getMaterial(RecentChatSender);
        for (let i = 0; i < totalPage; i++) {
            page.number = (i + 1);
            sender.queryList(query, page, this.appContext.createDataBackAction((data: any) => {
                const info = data.info;
                if (info && info.success) {
                    const items: RecentChat[] = data.body.items;
                    back(true, items, '');
                } else {
                    back(false, [], '请求失败！');
                }
            }), false);
        }
    }
}
