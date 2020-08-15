import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import RecentChatHandler from '@/app/com/main/module/business/chat/handler/RecentChatHandler';
import RecentChat from '@/app/com/main/module/business/chat/bean/RecentChat';
import UserChatDataSender from '@/app/com/main/module/business/chat/sender/UserChatDataSender';
import RecentChatUserFunction from '@/app/com/main/module/business/chat/function/RecentChatUserFunction';
import UserChatData from '@/app/com/main/module/business/chat/data/UserChatData';
import GroupChatDataSender from '@/app/com/main/module/business/chat/sender/GroupChatDataSender';
import RecentChatGroupFunction from '@/app/com/main/module/business/chat/function/RecentChatGroupFunction';
import GroupChatData from '@/app/com/main/module/business/chat/data/GroupChatData';
import Prompter from '@/app/com/client/component/Prompter';

export default class RecentChatService extends AbstractMaterial {

    public loadListByCount(count: number): void {
        const own = this;
        const prompter: Prompter = this.appContext.getMaterial(Prompter);
        const handler: RecentChatHandler = this.appContext.getMaterial(RecentChatHandler);
        handler.getListByCount(count, (success, list, message) => {
            if (success) {
                own.setRecentChatList(list);
            } else {
                prompter.prompt(message ? message : '请求失败！');
            }
        });
    }

    public setRecentChatList(list: RecentChat[]): void {
        if (list) {
            const userContentIds: string[] = [];
            const groupContentIds: string[] = [];
            for (const v of list) {
                if (RecentChat.TYPE_USER === v.type) {
                    userContentIds.push(v.contentId);
                }
                if (RecentChat.TYPE_GROUP === v.type) {
                    groupContentIds.push(v.contentId);
                }
            }
            this.setUserContentIds(userContentIds);
            this.setGroupContentIds(groupContentIds);
        }
    }

    public setUserContentIds(contentIds: string[]): void {
        const own = this;
        const prompter: Prompter = this.appContext.getMaterial(Prompter);
        const sender: UserChatDataSender = this.appContext.getMaterial(UserChatDataSender);
        const work: RecentChatUserFunction = this.appContext.getMaterial(RecentChatUserFunction);

        sender.getByContentIds(contentIds, this.appContext.createDataBackAction((data: any) => {
            const info = data.info;
            if (info && info.success) {
                const items: UserChatData[] = data.body.items;
                work.setRecentChatList(items);
            } else {
                prompter.prompt('请求失败！');
            }
        }), false);
    }

    public setGroupContentIds(contentIds: string[]): void {
        const own = this;
        const prompter: Prompter = this.appContext.getMaterial(Prompter);
        const sender: GroupChatDataSender = this.appContext.getMaterial(GroupChatDataSender);
        const work: RecentChatGroupFunction = this.appContext.getMaterial(RecentChatGroupFunction);

        sender.getByContentIds(contentIds, this.appContext.createDataBackAction((data: any) => {
            const info = data.info;
            if (info && info.success) {
                const items: GroupChatData[] = data.body.items;
                work.setRecentChatList(items);
            } else {
                prompter.prompt('请求失败！');
            }
        }), false);
    }
}
