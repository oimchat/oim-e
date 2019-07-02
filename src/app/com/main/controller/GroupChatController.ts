import AbstractMaterial from '@/app/base/AbstractMaterial';
import Content from '@/app/com/data/chat/content/Content';
import DataBackAction from '@/app/base/net/DataBackAction';
import GroupChatSender from '@/app/com/main/sender/GroupChatSender';
import PersonalBox from '@/app/com/main/box/PersonalBox';
import ChatQuery from '@/app/com/data/chat/ChatQuery';
import Page from '@/app/com/data/Page';
import GroupChatService from '@/app/com/main/service/GroupChatService';
import GroupLastChatService from '@/app/com/main/service/GroupLastChatService';


export default class GroupChatController extends AbstractMaterial {

    public chat(groupId: string, content: Content, back?: DataBackAction): void {
        const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
        const groupChatSender: GroupChatSender = this.appContext.getMaterial(GroupChatSender);
        groupChatSender.chat(pb.getUserId(), groupId, content, back);
    }

    public queryList(groupId: string, chatQuery: ChatQuery, page: Page, back?: DataBackAction): void {
        const groupChatSender: GroupChatSender = this.appContext.getMaterial(GroupChatSender);
        groupChatSender.queryList(groupId, chatQuery, page, back);
    }

    public getListByContentId(groupId: string, startId: string, direction: string, count: number, back?: DataBackAction): void {
        const groupChatSender: GroupChatSender = this.appContext.getMaterial(GroupChatSender);
        groupChatSender.getListByContentId(groupId, startId, direction, count, back);
    }

    public getListByMessageKey(groupId: string, startMessageKey: string, direction: string, count: number, back?: DataBackAction): void {
        const groupChatSender: GroupChatSender = this.appContext.getMaterial(GroupChatSender);
        groupChatSender.getListByMessageKey(groupId, startMessageKey, direction, count, back);
    }

    public getLastChatWithContentList(count: number, back?: DataBackAction): void {
        const groupChatSender: GroupChatSender = this.appContext.getMaterial(GroupChatSender);
        groupChatSender.getLastChatWithContentList(count, back);
    }

    public loadHistory(groupId: string, startMessageKey: string, count: number) {
        const ucs: GroupChatService = this.appContext.getMaterial(GroupChatService);
        ucs.loadHistory(groupId, startMessageKey, count);
    }

    public loadLastChatWithContentList(count: number) {
        const ucs: GroupLastChatService = this.appContext.getMaterial(GroupLastChatService);
        this.getLastChatWithContentList(count);
    }
}
