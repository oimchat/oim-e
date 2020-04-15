import AbstractMaterial from '@/app/base/AbstractMaterial';
import User from '@/app/com/bean/User';
import ViewEnum from '@/app/com/main/view/ViewEnum';
import Content from '@/app/com/data/chat/content/Content';
import GroupChatView from '@/app/com/main/view/GroupChatView';
import GroupChatSender from '@/app/com/main/sender/GroupChatSender';
import PersonalBox from '@/app/com/main/box/PersonalBox';
import DataBackAction from '@/app/base/net/DataBackAction';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import ChatQuery from '@/app/com/data/chat/ChatQuery';
import Page from '@/app/com/data/common/Page';
import GroupChatHistory from '@/app/com/data/chat/GroupChatHistory';
import Group from '@/app/com/bean/Group';
import UserInfoUtil from '@/app/com/main/util/UserInfoUtil';

export default class GroupChatManager extends AbstractMaterial {

    protected loadMap: Map<string, boolean> = new Map<string, boolean>();

    public chat(isReceive: boolean, isOwn: boolean, group: Group, chatUser: User, content: Content): void {
        const key = group.id;
        const groupChatView: GroupChatView = this.appContext.getView(ViewEnum.GroupChatView);
        groupChatView.insertLast(isReceive, isOwn, key, chatUser, content);
    }

    public firstLoadHistory(groupId: string, startMessageKey: string, count: number) {
        if (!this.loadMap.has(groupId)) {
            this.loadMap.set(groupId, true);
            this.loadHistory(groupId, startMessageKey, count);
        }
    }

    public loadHistory(groupId: string, startMessageKey: string, count: number) {
        const own = this;
        const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
        const groupChatSender: GroupChatSender = this.appContext.getMaterial(GroupChatSender);

        const back: DataBackAction = {
            back(data: any): void {
                if (data) {
                    const info = data.info;
                    if (info && info.success) {
                        const contents: GroupChatHistory[] = data.body.contents as GroupChatHistory[];
                        own.setHistory(contents);
                    }
                }
            },
            timeOut(data: any): void {
                // no
            },
            lost(data: any): void {
                // no
            },
        } as AbstractDataBackAction;
        const chatQuery = new ChatQuery();
        const page = new Page();
        // groupChatSender.queryList(groupId, pb.getUserId(), chatQuery, page, back);
        const direction = 'history';
        groupChatSender.getListByMessageKey(groupId, startMessageKey, direction, count, back);
    }

    public setHistory(contents: GroupChatHistory[]) {
        if (contents) {
            // contents.sort((a: GroupChatHistory, b: GroupChatHistory) => {
            //     return 0;
            // });
            const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
            const ownUserId = pb.getUserId();
            const isReceive = true;
            const groupChatView: GroupChatView = this.appContext.getView(ViewEnum.GroupChatView);
            const length = contents.length;
            for (let i = length - 1; i >= 0; i--) {
                const data = contents[i];
                const messageKey: string = data.messageKey;
                const contentId: string = data.contentId;
                const content: Content = data.content;
                const groupId: string = data.groupId;
                const chatUser: User = data.user;

                const sendUserId: string = chatUser.id;

                const isOwn: boolean = sendUserId === ownUserId;


                const key = groupId;

                UserInfoUtil.handleAvatar(chatUser);

                groupChatView.insertBefore(isReceive, isOwn, key, chatUser, content);
            }
        }
    }
}
