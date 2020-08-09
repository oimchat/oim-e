import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Page from '@/app/com/common/data/Page';
import GroupChatService from '@/app/com/main/module/business/chat/service/GroupChatService';
import GroupChatQuery from '@/app/com/main/module/business/chat/data/GroupChatQuery';
import GroupChatDataSender from '@/app/com/main/module/business/chat/sender/GroupChatDataSender';
import GroupChatDataService from '@/app/com/main/module/business/chat/service/GroupChatDataService';
import MessageContentWrap from '@/common/vue/data/content/impl/message/MessageContentWrap';


export default class GroupChatDataController extends AbstractMaterial {

    public queryList(query: GroupChatQuery, page: Page, back: (page: Page, contents: MessageContentWrap[]) => void): void {
        const service: GroupChatDataService = this.appContext.getMaterial(GroupChatDataService);
        service.queryList(query, page, back);
    }

    public getListByStartId(groupId: string, startId: string, direction: string, count: number, back?: DataBackAction): void {
        const sender: GroupChatDataSender = this.appContext.getMaterial(GroupChatDataSender);
        sender.getListByStartId(groupId, startId, direction, count, back);
    }

    public getListByStartMessageKey(groupId: string, startMessageKey: string, direction: string, count: number, back?: DataBackAction): void {
        const sender: GroupChatDataSender = this.appContext.getMaterial(GroupChatDataSender);
        sender.getListByStartMessageKey(groupId, startMessageKey, direction, count, back);
    }

    public loadHistory(groupId: string, startMessageKey: string, count: number) {
        const ucs: GroupChatService = this.appContext.getMaterial(GroupChatService);
        ucs.loadHistory(groupId, startMessageKey, count);
    }
}
