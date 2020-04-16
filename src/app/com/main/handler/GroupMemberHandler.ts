import AbstractMaterial from '@/app/base/AbstractMaterial';
import Page from '@/app/com/data/common/Page';
import GroupMemberSender from '@/app/com/main/sender/GroupMemberSender';
import PersonalBox from '@/app/com/main/box/PersonalBox';

export default class GroupMemberHandler extends AbstractMaterial {

    public loadAllOwnerGroupMemberList(): void {
        const own = this;
        const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
        const userId = pb.getUserId();
        const sender: GroupMemberSender = this.appContext.getMaterial(GroupMemberSender);
        const dataBack = this.appContext.createDataBackAction((data: any) => {
            if (data.body && data.body.count) {
                const count: number = data.body.count;
                own.loadOwnerGroupMemberListByCount(count);
            }
        });
        sender.getOwnerGroupMemberCountByUserId(userId, dataBack);
    }

    public loadOwnerGroupMemberListByCount(count: number): void {
        const pb: PersonalBox = this.appContext.getMaterial(PersonalBox);
        const userId = pb.getUserId();
        const page: Page = new Page();
        page.setTotalCount(count);
        const totalPage = page.getTotalPage();
        const sender: GroupMemberSender = this.appContext.getMaterial(GroupMemberSender);
        for (let i = 0; i < totalPage; i++) {
            page.number = (i + 1);
            sender.getOwnerGroupMemberListByUserId(userId, page);
        }
    }
}
