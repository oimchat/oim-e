import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Page from '@/app/com/common/data/Page';
import GroupMemberSender from '@/app/com/main/module/business/group/sender/GroupMemberSender';
import PersonalBox from '@/app/com/main/module/business/personal/box/PersonalBox';

export default class GroupMemberOfOwnerHandler extends AbstractMaterial {

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
