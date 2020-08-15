import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import UserChatDataSender from '@/app/com/main/module/business/chat/sender/UserChatDataSender';
import RecentChatUserFunction from '@/app/com/main/module/business/chat/function/RecentChatUserFunction';
import UserChatData from '@/app/com/main/module/business/chat/data/UserChatData';
import UserChatUnread from '@/app/com/main/module/business/chat/bean/UserChatUnread';
import UserChatUnreadHandler from '@/app/com/main/module/business/chat/handler/UserChatUnreadHandler';
import UserChatUnreadFunction from '@/app/com/main/module/business/chat/function/UserChatUnreadFunction';
import Content from '@/app/com/common/chat/Content';
import PersonalBox from '@/app/com/main/module/business/personal/box/PersonalBox';
import User from '@/app/com/main/module/business/user/bean/User';
import Prompter from '@/app/com/client/component/Prompter';

export default class UserChatUnreadService extends AbstractMaterial {


    public loadAllList(): void {
        const own = this;
        const prompter: Prompter = this.appContext.getMaterial(Prompter);
        const handler: UserChatUnreadHandler = this.appContext.getMaterial(UserChatUnreadHandler);
        handler.getAllList((success, list, message) => {
            if (success) {
                own.setUnreadList(list);
            } else {
                prompter.prompt(message ? message : '请求失败！');
            }
        });
    }

    public loadListByCount(count: number): void {
        const own = this;
        const prompter: Prompter = this.appContext.getMaterial(Prompter);
        const handler: UserChatUnreadHandler = this.appContext.getMaterial(UserChatUnreadHandler);
        handler.getListByCount(count, (success, list, message) => {
            if (success) {
                own.setUnreadList(list);
            } else {
                prompter.prompt(message ? message : '请求失败！');
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
        const prompter: Prompter = this.appContext.getMaterial(Prompter);
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
                prompter.prompt('请求失败！');
            }
        }), false);
    }

    public readByUser(sendUserId: string, receiveUserId: string): void {
        const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
        const ownUserId = pb.getUserId();
        const isOwn: boolean = sendUserId === ownUserId;
        if (!isOwn) {
            const unreadWork: UserChatUnreadFunction = this.appContext.getMaterial(UserChatUnreadFunction);
            unreadWork.read(sendUserId);
        }
    }

    public readByContent(sendUserId: string, receiveUserId: string, contentId: string): void {
        const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
        const ownUserId = pb.getUserId();
        const isOwn: boolean = sendUserId === ownUserId;
        if (!isOwn) {
            const unreadWork: UserChatUnreadFunction = this.appContext.getMaterial(UserChatUnreadFunction);
            unreadWork.read(sendUserId);
        }
    }
}
