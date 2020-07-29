import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Page from '@/app/com/data/common/Page';
import UserChatService from '@/app/com/main/service/UserChatService';
import UserChatDataSender from '@/app/com/main/sender/UserChatDataSender';
import UserChatQuery from '@/app/com/data/chat/UserChatQuery';
import UserChatDataService from '@/app/com/main/service/UserChatDataService';
import ContentData from '@/views/common/chat/ContentData';


export default class UserChatDataController extends AbstractMaterial {

    public queryList(query: UserChatQuery, page: Page, back: (page: Page, contents: ContentData[]) => void): void {
        const userChatDataService: UserChatDataService = this.appContext.getMaterial(UserChatDataService);
        userChatDataService.queryList(query, page, back);
    }

    public getListByStartId(sendUserId: string, receiveUserId: string, startId: string, direction: string, count: number, back?: DataBackAction): void {
        const userChatSender: UserChatDataSender = this.appContext.getMaterial(UserChatDataSender);
        userChatSender.getListByStartId(sendUserId, receiveUserId, startId, direction, count, back);
    }

    public getListByStartMessageKey(sendUserId: string, receiveUserId: string, startMessageKey: string, direction: string, count: number, back?: DataBackAction): void {
        const userChatSender: UserChatDataSender = this.appContext.getMaterial(UserChatDataSender);
        userChatSender.getListByStartMessageKey(sendUserId, receiveUserId, startMessageKey, direction, count, back);
    }

    public loadHistory(userId: string, startMessageKey: string, count: number) {
        const ucs: UserChatService = this.appContext.getMaterial(UserChatService);
        ucs.loadHistory(userId, startMessageKey, count);
    }
}
