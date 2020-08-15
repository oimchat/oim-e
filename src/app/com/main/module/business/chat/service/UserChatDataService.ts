import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/main/module/business/user/bean/User';
import Content from '@/app/com/common/chat/Content';
import PersonalBox from '@/app/com/main/module/business/personal/box/PersonalBox';
import DataBackAction from '@/app/base/net/DataBackAction';
import UserChatDataSender from '@/app/com/main/module/business/chat/sender/UserChatDataSender';
import UserChatQuery from '@/app/com/main/module/business/chat/data/UserChatQuery';
import Page from '@/app/com/common/data/Page';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import UserChatData from '@/app/com/main/module/business/chat/data/UserChatData';
import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';
import MessageContentWrap from '@/common/vue/data/content/impl/message/MessageContentWrap';
import Prompter from '@/app/com/client/component/Prompter';


export default class UserChatDataService extends AbstractMaterial {


    public queryList(query: UserChatQuery, page: Page, back: (page: Page, contents: MessageContentWrap[]) => void) {
        const own = this;
        const prompter: Prompter = this.appContext.getMaterial(Prompter);
        const userChatSender: UserChatDataSender = this.appContext.getMaterial(UserChatDataSender);
        const queryBack: DataBackAction = {
            back(data: any): void {
                if (data) {
                    const info = data.info;
                    if (info && info.success) {
                        const items: UserChatData[] = data.body.items;
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
        userChatSender.queryList(query, page, queryBack);
    }

    private doBack(page: Page, items: UserChatData[], back: (page: Page, contents: MessageContentWrap[]) => void): void {
        if (items) {
            const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
            const ownUserId = pb.getUserId();
            const list: MessageContentWrap[] = [];
            const length = items.length;
            for (let i = length - 1; i >= 0; i--) {
                const data = items[i];

                const content: Content = data.content;
                const receiveUser: User = data.receiveUser;
                const sendUser: User = data.sendUser;

                const sendUserId: string = sendUser.id;
                const receiveUserId: string = receiveUser.id;

                const isOwn: boolean = sendUserId === ownUserId;

                const showUser: User = (isOwn) ? receiveUser : sendUser;
                const chatUser: User = (isOwn) ? sendUser : showUser;

                const key = showUser.id;

                UserInfoUtil.handleAvatar(showUser);
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
