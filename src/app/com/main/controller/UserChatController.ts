import AbstractMaterial from '@/app/base/AbstractMaterial';
import Content from '@/app/com/data/chat/content/Content';
import DataBackAction from '@/app/base/net/DataBackAction';
import UserChatSender from '@/app/com/main/sender/UserChatSender';
import PersonalBox from '@/app/com/main/box/PersonalBox';
import ChatQuery from '@/app/com/data/chat/ChatQuery';
import Page from '@/app/com/data/common/Page';
import UserChatService from '@/app/com/main/service/UserChatService';
import UserLastChatService from '@/app/com/main/service/UserLastChatService';
import ContentUploadImageService from '@/app/com/main/service/ContentUploadImageService';


export default class UserChatController extends AbstractMaterial {

    public userChat(receiveUserId: string, content: Content, back?: DataBackAction): void {
        const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
        const userChatSender: UserChatSender = this.appContext.getMaterial(UserChatSender);
        userChatSender.userChat(pb.getUserId(), receiveUserId, content, back);
    }

    public queryList(sendUserId: string, receiveUserId: string, chatQuery: ChatQuery, page: Page, back?: DataBackAction): void {
        const userChatSender: UserChatSender = this.appContext.getMaterial(UserChatSender);
        userChatSender.queryList(sendUserId, receiveUserId, chatQuery, page, back);
    }

    public getListByContentId(sendUserId: string, receiveUserId: string, startId: string, direction: string, count: number, back?: DataBackAction): void {
        const userChatSender: UserChatSender = this.appContext.getMaterial(UserChatSender);
        userChatSender.getListByContentId(sendUserId, receiveUserId, startId, direction, count, back);
    }

    public getListByMessageKey(sendUserId: string, receiveUserId: string, startMessageKey: string, direction: string, count: number, back?: DataBackAction): void {
        const userChatSender: UserChatSender = this.appContext.getMaterial(UserChatSender);
        userChatSender.getListByMessageKey(sendUserId, receiveUserId, startMessageKey, direction, count, back);
    }

    public getLastChatWithContentList(count: number, back?: DataBackAction): void {
        const userChatSender: UserChatSender = this.appContext.getMaterial(UserChatSender);
        userChatSender.getLastChatWithContentList(count, back);
    }

    public loadHistory(userId: string, startMessageKey: string, count: number) {
        const ucs: UserChatService = this.appContext.getMaterial(UserChatService);
        ucs.loadHistory(userId, startMessageKey, count);
    }

    public loadLastChatWithContentList(count: number) {
        const ucs: UserLastChatService = this.appContext.getMaterial(UserLastChatService);
        this.getLastChatWithContentList(count);
    }
}
