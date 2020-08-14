import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import AbstractDataBackAction from '@/app/base/net/AbstractDataBackAction';
import GroupInfoUtil from '@/app/com/main/common/util/GroupInfoUtil';
import Group from '@/app/com/main/module/business/group/bean/Group';
import GroupBox from '@/app/com/main/module/business/group/box/GroupBox';
import GroupInfoSender from '@/app/com/main/module/business/group/sender/GroupInfoSender';

export default class GroupHandler extends AbstractMaterial {

    public getGroupById(groupId: string, back: (success: boolean, message: string, group: Group) => void): void {
        const group: Group = this.getLocalGroupById(groupId);
        if (group) {
            back(true, '', group);
        } else {
            this.getRemoteGroupById(groupId, back);
        }
    }

    public getLocalGroupById(groupId: string): Group {
        const groupBox: GroupBox = this.appContext.getMaterial(GroupBox);
        return groupBox.getGroup(groupId);
    }

    public getRemoteGroupById(groupId: string, back: (success: boolean, message: string, group: Group) => void): void {
        let group: Group | any;
        if (groupId) {
            const own = this;
            const dataBack: DataBackAction = {
                back(data: any): void {
                    let mark = false;

                    if (data && data.body) {
                        group = data.body;
                        if (group) {
                            GroupInfoUtil.handleAvatar(group);
                            mark = true;
                        }
                    }
                    back(mark, '', group);
                },
                timeOut(data: any): void {
                    back(false, '请求超时！', group);
                },
                lost(data: any): void {
                    back(false, '请求失败！', group);
                },
            } as AbstractDataBackAction;
            const groupSender: GroupInfoSender = this.appContext.getMaterial(GroupInfoSender);
            groupSender.getGroup(groupId, dataBack);
        } else {
            back(false, '请求失败！', group);
        }
    }
}
