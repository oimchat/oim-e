import AbstractMaterial from '@/app/base/AbstractMaterial';
import User from '@/app/com/bean/User';
import ViewEnum from '@/app/com/main/view/ViewEnum';
import Content from '@/app/com/data/chat/content/Content';
import GroupChatView from '@/app/com/main/view/GroupChatView';
import PersonalBox from '@/app/com/main/box/PersonalBox';
import DataBackAction from '@/app/base/net/DataBackAction';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import Page from '@/app/com/data/common/Page';
import Group from '@/app/com/bean/Group';
import UserInfoUtil from '@/app/com/main/util/UserInfoUtil';
import GroupChatDataSender from '@/app/com/main/sender/GroupChatDataSender';
import GroupChatData from '@/app/com/data/chat/GroupChatData';
import GroupBox from '@/app/com/main/box/GroupBox';
import DirectionEnum from '@/app/com/data/chat/type/DirectionEnum';

export default class GroupChatManager extends AbstractMaterial {

    protected loadMap: Map<string, boolean> = new Map<string, boolean>();

    public clear(): void {
        this.loadMap.clear();
    }

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
        const groupChatSender: GroupChatDataSender = this.appContext.getMaterial(GroupChatDataSender);

        const back: DataBackAction = {
            back(data: any): void {
                if (data) {
                    const info = data.info;
                    if (info && info.success) {
                        const contents: GroupChatData[] = data.body.items as GroupChatData[];
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
        const page = new Page();
        // groupChatSender.queryList(groupId, pb.getUserId(), chatQuery, page, back);
        const direction = DirectionEnum.before;
        groupChatSender.getListByStartMessageKey(groupId, startMessageKey, direction, count, back);
    }

    public setHistory(contents: GroupChatData[]) {
        if (contents) {
            // contents.sort((a: GroupChatHistory, b: GroupChatHistory) => {
            //     return 0;
            // });
            const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
            const groupBox: GroupBox = this.appContext.getMaterial(GroupBox);

            const ownUserId = pb.getUserId();
            const isReceive = true;
            const groupChatView: GroupChatView = this.appContext.getView(ViewEnum.GroupChatView);
            const length = contents.length;
            for (let i = length - 1; i >= 0; i--) {
                const data = contents[i];
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

                groupChatView.insertBefore(isReceive, isOwn, key, chatUser, content);
            }
        }
    }
}
