import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import GroupJoinSettingSender from '@/app/com/main/module/business/group/sender/GroupJoinSettingSender';
import GroupJoinSetting from '@/app/com/main/module/business/group/bean/GroupJoinSetting';
import GroupJoinVerifyQuestion from '@/app/com/main/module/business/group/bean/GroupJoinVerifyQuestion';


export default class GroupSettingController extends AbstractMaterial {

    public getJoinSetting(groupId: string, back?: DataBackAction, parallel?: boolean): void {
        const groupSettingSender: GroupJoinSettingSender = this.appContext.getMaterial(GroupJoinSettingSender);
        groupSettingSender.getJoinSetting(groupId, back, parallel);
    }

    public updateJoinSetting(joinSetting: GroupJoinSetting, questionList: GroupJoinVerifyQuestion[], back?: DataBackAction, parallel?: boolean): void {
        const groupSettingSender: GroupJoinSettingSender = this.appContext.getMaterial(GroupJoinSettingSender);
        groupSettingSender.updateJoinSetting(joinSetting, questionList, back, parallel);
    }
}
