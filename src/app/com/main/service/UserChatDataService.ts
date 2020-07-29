import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/bean/User';
import Content from '@/app/com/data/chat/content/Content';
import PersonalBox from '@/app/com/main/box/PersonalBox';
import DataBackAction from '@/app/base/net/DataBackAction';
import UserChatDataSender from '@/app/com/main/sender/UserChatDataSender';
import UserChatQuery from '@/app/com/data/chat/UserChatQuery';
import Page from '@/app/com/data/common/Page';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import UserChatData from '@/app/com/data/chat/UserChatData';
import UserInfoUtil from '@/app/com/main/util/UserInfoUtil';
import ContentData from '@/views/common/chat/ContentData';


export default class UserChatDataService extends AbstractMaterial {


    public queryList(query: UserChatQuery, page: Page, back: (page: Page, contents: ContentData[]) => void) {
        const own = this;
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
        userChatSender.queryList(query, page, queryBack);
    }

    private doBack(page: Page, items: UserChatData[], back: (page: Page, contents: ContentData[]) => void): void {
        if (items) {
            const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
            const ownUserId = pb.getUserId();
            const list: ContentData[] = [];
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
