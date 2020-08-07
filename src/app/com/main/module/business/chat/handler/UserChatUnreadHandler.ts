import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import UserChatDataSender from '@/app/com/main/module/business/chat/sender/UserChatDataSender';
import Page from '@/app/com/common/data/Page';
import UserChatUnreadQuery from '@/app/com/main/module/business/chat/data/UserChatUnreadQuery';
import UserChatUnread from '@/app/com/main/module/business/chat/bean/UserChatUnread';

export default class UserChatUnreadHandler extends AbstractMaterial {

    public getAllList(back: (success: boolean, list: UserChatUnread[], message?: string) => void): void {
        const own = this;
        const sender: UserChatDataSender = this.appContext.getMaterial(UserChatDataSender);
        const dataBack = this.appContext.createDataBackAction((data: any) => {
            if (data.body && data.body.count) {
                const count: number = data.body.count;
                own.getListByCount(count, back);
            }
        });
        const query: UserChatUnreadQuery = new UserChatUnreadQuery();
        sender.queryUserChatUnreadCount(query, dataBack);
    }

    public getListByCount(count: number, back: (success: boolean, list: UserChatUnread[], message?: string) => void): void {
        const query: UserChatUnreadQuery = new UserChatUnreadQuery();
        const page: Page = new Page();
        page.setTotalCount(count);
        const totalPage = page.getTotalPage();
        const sender: UserChatDataSender = this.appContext.getMaterial(UserChatDataSender);
        for (let i = 0; i < totalPage; i++) {
            page.number = (i + 1);
            sender.queryUserChatUnreadList(query, page, this.appContext.createDataBackAction((data: any) => {
                const info = data.info;
                if (info && info.success) {
                    const items: UserChatUnread[] = data.body.items;
                    back(true, items, '');
                } else {
                    back(false, [], '请求失败！');
                }
            }), false);
        }
    }
}
