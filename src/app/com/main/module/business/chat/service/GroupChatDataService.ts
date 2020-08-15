import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/main/module/business/user/bean/User';
import Content from '@/app/com/common/chat/Content';
import PersonalBox from '@/app/com/main/module/business/personal/box/PersonalBox';
import DataBackAction from '@/app/base/net/DataBackAction';
import Group from '@/app/com/main/module/business/group/bean/Group';
import GroupBox from '@/app/com/main/module/business/group/box/GroupBox';
import Page from '@/app/com/common/data/Page';
import MessageContentWrap from '@/common/vue/data/content/impl/message/MessageContentWrap';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';
import GroupChatQuery from '@/app/com/main/module/business/chat/data/GroupChatQuery';
import GroupChatData from '@/app/com/main/module/business/chat/data/GroupChatData';
import GroupChatDataSender from '@/app/com/main/module/business/chat/sender/GroupChatDataSender';
import Prompter from '@/app/com/client/component/Prompter';


export default class GroupChatDataService extends AbstractMaterial {

    public queryList(query: GroupChatQuery, page: Page, back: (page: Page, contents: MessageContentWrap[]) => void) {
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
                        prompter.promptData(data);
                    }
                }
            },
            timeOut(data: any): void {
                prompter.prompt('查询超时！');
            },
            lost(data: any): void {
                prompter.prompt('网络异常！');
            },
        } as AbstractDataBackAction;
        groupChatSender.queryList(query, page, queryBack);
    }

    private doBack(page: Page, items: GroupChatData[], back: (page: Page, contents: MessageContentWrap[]) => void): void {
        if (items) {
            const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
            const groupBox: GroupBox = this.appContext.getMaterial(GroupBox);
            const ownUserId = pb.getUserId();
            const list: MessageContentWrap[] = [];
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

                const contentData: MessageContentWrap = new MessageContentWrap();
                contentData.key = messageKey;
                contentData.id = contentId;
                contentData.content = content;
                contentData.name = showName;
                contentData.user = chatUser;
                contentData.isOwn = isOwn;
                contentData.timeVisible = true;
                contentData.nameVisible = true;
                contentData.status = 1;


                list.push(contentData);
            }
            back(page, list);
        }
    }
}
