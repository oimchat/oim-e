import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';
import Page from '@/app/com/common/data/Page';
import GroupInviteApplyQuery from '@/app/com/main/module/business/group/data/GroupInviteApplyQuery';
import GroupInviteVerifyHandleData from '@/app/com/main/module/business/group/data/GroupInviteVerifyHandleData';
import GroupInviteeApplyQuery from '@/app/com/main/module/business/group/data/GroupInviteeApplyQuery';
import GroupInviteeHandleData from '@/app/com/main/module/business/group/data/GroupInviteeHandleData';
import AbstractSender from '@/app/com/main/common/base/sender/AbstractSender';

export default class GroupInviteSender extends AbstractSender  {

    private action: string = '1.3.008';

    public queryInviteApplyReceiveCount(query: GroupInviteApplyQuery, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0001');
        m.body = {};
        m.body.query = query;
        this.send(m, back, parallel);
    }

    public queryInviteApplyReceiveList(query: GroupInviteApplyQuery, page: Page, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0002');
        m.body = {};
        m.body.page = page;
        m.body.query = query;
        this.send(m, back, parallel);
    }

    public inviteVerifyHandle(handle: GroupInviteVerifyHandleData, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0005');
        m.body = {};
        m.body.handle = handle;
        this.send(m, back, parallel);
    }

    public invite(groupId: string, userIds: string[], back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0006');
        m.body = {};
        m.body.groupId = groupId;
        m.body.userIds = userIds;
        this.send(m, back, parallel);
    }


    public queryInviteeCount(query: GroupInviteeApplyQuery, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0007');
        m.body = {};
        m.body.query = query;
        this.send(m, back, parallel);
    }

    public queryInviteeList(query: GroupInviteeApplyQuery, page: Page, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0008');
        m.body = {};
        m.body.page = page;
        m.body.query = query;
        this.send(m, back, parallel);
    }

    public inviteeHandle(handle: GroupInviteeHandleData, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0010');
        m.body = {};
        m.body.handle = handle;
        this.send(m, back, parallel);
    }
}
