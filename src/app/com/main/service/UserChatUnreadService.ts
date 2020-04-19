import AbstractMaterial from '@/app/base/AbstractMaterial';
import UserChatDataSender from '@/app/com/main/sender/UserChatDataSender';
import RecentChatUserFunction from '@/app/com/main/function/RecentChatUserFunction';
import UserChatData from '@/app/com/data/chat/UserChatData';
import UserChatUnread from '@/app/com/bean/UserChatUnread';
import UserChatUnreadHandler from '@/app/com/main/handler/UserChatUnreadHandler';
import UserChatUnreadFunction from '@/app/com/main/function/UserChatUnreadFunction';

export default class UserChatUnreadService extends AbstractMaterial {


    public loadAllList(): void {
        const own = this;
        const handler: UserChatUnreadHandler = this.appContext.getMaterial(UserChatUnreadHandler);
        handler.getAllList((success, list, message) => {
            if (success) {
                own.setUnreadList(list);
            } else {
                own.appContext.prompt(message ? message : '请求失败！');
            }
        });
    }

    public loadListByCount(count: number): void {
        const own = this;
        const handler: UserChatUnreadHandler = this.appContext.getMaterial(UserChatUnreadHandler);
        handler.getListByCount(count, (success, list, message) => {
            if (success) {
                own.setUnreadList(list);
            } else {
                own.appContext.prompt(message ? message : '请求失败！');
            }
        });
    }

    public setUnreadList(list: UserChatUnread[]): void {
        if (list) {
            const contentIds: string[] = [];
            const groupContentIds: string[] = [];
            for (const v of list) {
                if (v.lastContentId) {
                    contentIds.push(v.lastContentId);
                }
            }
            this.setUserContentIds(list, contentIds);
        }
    }

    public setUserContentIds(list: UserChatUnread[], contentIds: string[]): void {
        const own = this;
        const sender: UserChatDataSender = this.appContext.getMaterial(UserChatDataSender);
        const recentWork: RecentChatUserFunction = this.appContext.getMaterial(RecentChatUserFunction);
        const unreadWork: UserChatUnreadFunction = this.appContext.getMaterial(UserChatUnreadFunction);

        sender.getByContentIds(contentIds, this.appContext.createDataBackAction((data: any) => {
            const info = data.info;
            if (info && info.success) {
                const items: UserChatData[] = data.body.items;
                recentWork.setRecentChatList(items);
                unreadWork.setList(list);
            } else {
                own.appContext.prompt('请求失败！');
            }
        }), false);
    }
}
