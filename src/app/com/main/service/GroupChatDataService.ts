import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/bean/User';
import Content from '@/app/com/data/chat/content/Content';
import PersonalBox from '@/app/com/main/box/PersonalBox';
import DataBackAction from '@/app/base/net/DataBackAction';
import Group from '@/app/com/bean/Group';
import GroupBox from '@/app/com/main/box/GroupBox';
import Page from '@/app/com/data/common/Page';
import ContentData from '@/views/common/chat/ContentData';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import UserInfoUtil from '@/app/com/main/util/UserInfoUtil';
import GroupChatQuery from '@/app/com/data/chat/GroupChatQuery';
import GroupChatData from '@/app/com/data/chat/GroupChatData';
import GroupChatDataSender from '@/app/com/main/sender/GroupChatDataSender';
import Prompter from '@/app/com/main/component/Prompter';


export default class GroupChatDataService extends AbstractMaterial {

    public queryList(query: GroupChatQuery, page: Page, back: (page: Page, contents: ContentData[]) => void) {
        const prompter: Prompter = this.appContext.getMaterial(Prompter);
        const own = this;
        const groupChatSender: GroupChatDataSender = this.appContext.getMaterial(GroupChatDataSender);
        const queryBack: DataBackAction = {
            back(data: any): void {
                if (data) {
                    const info = data.info;
                    if (info && info.success) {
                        const items: GroupChatData[] = data.body.items as GroupChatData[];
                        const p: Page = data.body.page;
                        own.doBack(p, items, back);
                    } else {
                        own.appContext.promptData(data);
                    }
                }
            },
            timeOut(data: any): void {
                own.appContext.prompt('查询超时！');
            },
            lost(data: any): void {
                own.appContext.prompt('网络异常！');
            },
        } as AbstractDataBackAction;
        groupChatSender.queryList(query, page, queryBack);
    }

    private doBack(page: Page, items: GroupChatData[], back: (page: Page, contents: ContentData[]) => void): void {
        if (items) {
            const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
            const groupBox: GroupBox = this.appContext.getMaterial(GroupBox);
            const ownUserId = pb.getUserId();
            const list: ContentData[] = [];
            const length = items.length;
            for (let i = length - 1; i >= 0; i--) {
                const data = items[i];

                // const messageKey: string = data.messageKey;
                // const contentId: string = data.contentId;
                const content: Content = data.content;
                let group: Group = data.group;
                const chatUser: User = data.user;

                const sendUserId: string = chatUser.id;

                const isOwn: boolean = sendUserId === ownUserId;

                const groupId = (group) ? group.id : '';
                const key = groupId;

                group = groupBox.getGroup(groupId);


                UserInfoUtil.handleAvatar(chatUser);


                const contentId: string = content.id;
                const messageKey = content.key;

                const showName = chatUser.nickname;

                const contentData: ContentData = new ContentData();
                contentData.key = messageKey;
                contentData.id = contentId;
                contentData.content = content;
                contentData.showName = showName;
                contentData.user = chatUser;
                contentData.isOwn = isOwn;
                contentData.timeVisible = true;
                contentData.showNameVisible = true;
                contentData.status = 1;


                list.push(contentData);
            }
            back(page, list);
        }
    }
}
