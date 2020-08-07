import AbstractInitializer from '@/app/com/main/initialize/AbstractInitializer';
import SystemInformationService from '@/app/com/client/module/prompt/service/SystemInformationService';
import DataBackAction from '@/app/base/net/DataBackAction';
import SystemInformType from '@/app/com/main/data/SystemInformType';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import GroupJoinApplyQuery from '@/app/com/main/module/business/group/data/GroupJoinApplyQuery';
import GroupJoinApply from '@/app/com/main/module/business/group/bean/GroupJoinApply';
import GroupJoinSender from '@/app/com/main/module/business/group/sender/GroupJoinSender';
import GroupInviteApplyQuery from '@/app/com/main/module/business/group/data/GroupInviteApplyQuery';
import GroupInviteApply from '@/app/com/main/module/business/group/bean/GroupInviteApply';
import GroupInviteSender from '@/app/com/main/module/business/group/sender/GroupInviteSender';
import GroupInviteeApplyQuery from '@/app/com/main/module/business/group/data/GroupInviteeApplyQuery';
import ContactAddApplyQuery from '@/app/com/main/module/business/contact/data/ContactAddApplyQuery';
import ContactAddApply from '@/app/com/main/module/business/contact/bean/ContactAddApply';
import ContactSender from '@/app/com/main/module/business/contact/sender/ContactSender';
import RecentChatService from '@/app/com/main/module/business/chat/service/RecentChatService';
import UserChatUnreadService from '@/app/com/main/module/business/chat/service/UserChatUnreadService';

export default class InformationInitializer extends AbstractInitializer {

    public getOrder(): number {
        return 2;
    }

    public initialize(): void {
        const own = this;
        setTimeout(() => {
            own.loadLastList();
            own.loadUnreadList();
            own.loadSystemInformation();
        }, 1000);
    }

    public loadSystemInformation() {
        const systemInformationService: SystemInformationService = this.appContext.getMaterial(SystemInformationService);

        const groupJoinBack: DataBackAction = {
            back(data: any): void {
                if (data && data.body) {
                    const count = data.body.count;
                    if (count && count > 0) {
                        systemInformationService.inform(SystemInformType.TYPE_APPLY_HANDLE, '加入群申请', count);
                    }
                }
            },
            timeOut(data: any): void {
                //
            },
            lost(data: any): void {
                //
            },
        } as AbstractDataBackAction;
        const groupJoinApplyQuery: GroupJoinApplyQuery = new GroupJoinApplyQuery();
        groupJoinApplyQuery.handleType = GroupJoinApply.HANDLE_TYPE_UNTREATED;
        const groupJoinSender: GroupJoinSender = this.appContext.getMaterial(GroupJoinSender);
        groupJoinSender.queryJoinApplyReceiveCount(groupJoinApplyQuery, groupJoinBack);


        const groupInviteABack: DataBackAction = {
            back(data: any): void {
                if (data && data.body) {
                    const count = data.body.count;
                    if (count && count > 0) {
                        systemInformationService.inform(SystemInformType.TYPE_APPLY_HANDLE, '邀请入群申请', count);
                    }
                }
            },
            timeOut(data: any): void {
                //
            },
            lost(data: any): void {
                //
            },
        } as AbstractDataBackAction;
        const groupInviteQuery: GroupInviteApplyQuery = new GroupInviteApplyQuery();
        groupInviteQuery.verifyHandleType = GroupInviteApply.VERIFY_HANDLE_TYPE_UNTREATED;
        const groupInviteSender: GroupInviteSender = this.appContext.getMaterial(GroupInviteSender);
        groupInviteSender.queryInviteApplyReceiveCount(groupInviteQuery, groupInviteABack);


        const groupInviteeBack: DataBackAction = {
            back(data: any): void {
                if (data && data.body) {
                    const count = data.body.count;
                    if (count && count > 0) {
                        systemInformationService.inform(SystemInformType.TYPE_APPLY_HANDLE, '邀请加入群', count);
                    }
                }
            },
            timeOut(data: any): void {
                //
            },
            lost(data: any): void {
                //
            },
        } as AbstractDataBackAction;

        const groupInviteeQuery: GroupInviteeApplyQuery = new GroupInviteeApplyQuery();
        groupInviteeQuery.inviteeHandleType = GroupInviteApply.INVITEE_HANDLE_TYPE_UNTREATED;

        groupInviteSender.queryInviteeCount(groupInviteeQuery, groupInviteeBack);

        const applyBack: DataBackAction = {
            back(data: any): void {
                if (data && data.body) {
                    const count = data.body.count;
                    if (count && count > 0) {
                        systemInformationService.inform(SystemInformType.TYPE_APPLY_HANDLE, '添加好友请求', count);
                    }
                }
            },
            timeOut(data: any): void {
                //
            },
            lost(data: any): void {
                //
            },
        } as AbstractDataBackAction;

        const contactAddApplyQuery: ContactAddApplyQuery = new ContactAddApplyQuery();
        contactAddApplyQuery.handleType = ContactAddApply.HANDLE_TYPE_UNTREATED;
        const contactSender: ContactSender = this.appContext.getMaterial(ContactSender);
        contactSender.getApplyCount(contactAddApplyQuery, applyBack);
    }

    public loadLastList() {
        const recentChatService: RecentChatService = this.appContext.getMaterial(RecentChatService);
        recentChatService.loadListByCount(20);
    }

    public loadUnreadList() {
        const userChatUnreadService: UserChatUnreadService = this.appContext.getMaterial(UserChatUnreadService);
        userChatUnreadService.loadAllList();
    }
}
