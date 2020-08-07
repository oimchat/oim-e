import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';
import Page from '@/app/com/common/data/Page';
import AbstractSender from '@/app/com/main/common/base/sender/AbstractSender';

export default class GroupMemberSender extends AbstractSender {

    private action: string = '1.3.004';

    public getOwnerGroupMemberCountByUserId(userId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0001');
        m.body = {
            query: {
                userId: '',
            },
        };
        m.body.query.userId = userId;
        this.send(m, back, parallel);
    }

    public getOwnerGroupMemberListByUserId(userId: string, page: Page, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0002');
        m.body = {
            query: {
                userId: '',
            },
        };
        m.body.query.userId = userId;
        m.body.page = page;
        this.send(m, back, parallel);
    }

    public getOwnerGroupMemberPageListByUserId(userId: string, size: number, pageNumber: number, back?: DataBackAction, parallel?: boolean): void {
        const page: Page = new Page();
        page.number = pageNumber;
        page.size = size;
        this.getOwnerGroupMemberListByUserId(userId, page, back, parallel);
    }


    public getGroupMemberCount(groupId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0003');
        m.body = {
            query: {
                groupId: '',
            },
        };
        m.body.query.groupId = groupId;
        this.send(m, back, parallel);
    }


    public getGroupMemberList(groupId: string, page: Page, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0004');
        m.body = {
            query: {
                groupId: '',
            },
        };
        m.body.query.groupId = groupId;
        m.body.page = page;
        this.send(m, back, parallel);
    }


    public getGroupMemberById(id: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0005');
        m.body = {};
        m.body.id = id;
        this.send(m, back, parallel);
    }


    public getGroupMember(groupId: string, userId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0007');
        m.body = {};
        m.body.groupId = groupId;
        m.body.userId = userId;
        this.send(m, back, parallel);
    }


    public updateNickname(groupId: string, userId: string, nickname: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0010');
        m.body = {};
        m.body.groupId = groupId;
        m.body.userId = userId;
        m.body.nickname = nickname;
        this.send(m, back, parallel);
    }


    public updatePosition(groupId: string, userId: string, position: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0011');
        m.body = {};
        m.body.groupId = groupId;
        m.body.userId = userId;
        m.body.position = position;
        this.send(m, back, parallel);
    }


    public delete(groupId: string, userId: string, back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0012');
        m.body = {};
        m.body.groupId = groupId;
        m.body.userId = userId;
        this.send(m, back, parallel);
    }
}
