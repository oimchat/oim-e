import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/main/module/business/user/bean/User';
import WorkViewEnum from '@/app/com/common/view/WorkViewEnum';
import Content from '@/app/com/common/chat/Content';
import GroupChatView from '@/app/com/main/module/business/chat/view/GroupChatView';
import PersonalBox from '@/app/com/main/module/business/personal/box/PersonalBox';
import DataBackAction from '@/app/base/net/DataBackAction';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import Page from '@/app/com/common/data/Page';
import Group from '@/app/com/main/module/business/group/bean/Group';
import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';
import GroupChatDataSender from '@/app/com/main/module/business/chat/sender/GroupChatDataSender';
import GroupChatData from '@/app/com/main/module/business/chat/data/GroupChatData';
import GroupBox from '@/app/com/main/module/business/group/box/GroupBox';
import DirectionEnum from '@/app/com/main/module/business/chat/data/type/DirectionEnum';

export default class GroupChatManager extends AbstractMaterial {

    protected loadMap: Map<string, boolean> = new Map<string, boolean>();

    public clear(): void {
        this.loadMap.clear();
    }

    public chat(isReceive: boolean, isOwn: boolean, group: Group, chatUser: User, content: Content): void {
        const key = group.id;
        const groupChatView: GroupChatView = this.appContext.getView(WorkViewEnum.GroupChatView);
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
            const groupChatView: GroupChatView = this.appContext.getView(WorkViewEnum.GroupChatView);
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
