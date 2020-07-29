import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Page from '@/app/com/data/common/Page';
import GroupChatService from '@/app/com/main/service/GroupChatService';
import GroupChatQuery from '@/app/com/data/chat/GroupChatQuery';
import GroupChatDataSender from '@/app/com/main/sender/GroupChatDataSender';
import GroupChatDataService from '@/app/com/main/service/GroupChatDataService';
import ContentData from '@/views/common/chat/ContentData';


export default class GroupChatDataController extends AbstractMaterial {

    public queryList(query: GroupChatQuery, page: Page, back: (page: Page, contents: ContentData[]) => void): void {
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
