import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import GroupSettingSender from '@/app/com/main/sender/GroupSettingSender';
import GroupJoinSetting from '@/app/com/bean/GroupJoinSetting';
import GroupJoinVerifyQuestion from '@/app/com/bean/GroupJoinVerifyQuestion';


export default class GroupSettingController extends AbstractMaterial {

    public getJoinSetting(groupId: string, back?: DataBackAction, parallel?: boolean): void {
        const groupSettingSender: GroupSettingSender = this.appContext.getMaterial(GroupSettingSender);
        groupSettingSender.getJoinSetting(groupId, back, parallel);
    }

    public updateJoinSetting(joinSetting: GroupJoinSetting, questionList: GroupJoinVerifyQuestion[], back?: DataBackAction, parallel?: boolean): void {
        const groupSettingSender: GroupSettingSender = this.appContext.getMaterial(GroupSettingSender);
        groupSettingSender.updateJoinSetting(joinSetting, questionList, back, parallel);
    }
}
