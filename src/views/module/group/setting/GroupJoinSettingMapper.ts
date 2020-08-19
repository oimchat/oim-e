import {Prop} from 'vue-property-decorator';
import GroupJoinSetting from '@/app/com/main/module/business/group/bean/GroupJoinSetting';
import GroupJoinVerifyQuestion from '@/app/com/main/module/business/group/bean/GroupJoinVerifyQuestion';
import DataBackAction from '@/app/base/net/DataBackAction';
import Prompt from '@/platform/web/common/Prompt';
import GroupJoinSettingController from '@/app/com/main/module/business/group/controller/GroupSettingController';
import app from '@/app/App';
import GroupMemberListOfPersonalBox from '@/app/com/main/module/business/group/box/GroupMemberListOfPersonalBox';
import GroupMember from '@/app/com/main/module/business/group/bean/GroupMember';
import InfoUtil from '@/app/base/message/util/InfoUtil';

export default class GroupJoinSettingMapper {

    public groupId: string = '';
    public isOwner: boolean = false;
    public setting: GroupJoinSetting = new GroupJoinSetting();
    public questionData: {
        questions: GroupJoinVerifyQuestion[],
    } = {
        questions: [],
    };

    public setGroupId(groupId: string) {
        this.groupId = groupId;
        this.keyChange(groupId);
        this.loadData();
    }

    public addQuestion(): void {
        const length = this.questionData.questions.length;
        if (length < 3) {
            this.questionData.questions.push(new GroupJoinVerifyQuestion());
        }
    }

    public removeQuestion(index: number): void {
        this.questionData.questions.splice(index, 1);
    }

    public save(back: (success: boolean, message: string) => void) {
        const own = this;
        const dataBackAction: DataBackAction = {
            back(d: any): void {
                if (d) {
                    const info = d.info;
                    if (info) {
                        back(info.success, info.success ? InfoUtil.getDefaultPromptText(info) : InfoUtil.getDefaultErrorText(info));
                    } else {
                        back(false, '修改失败！');
                    }
                } else {
                    back(false, '修改失败！');
                }
            },
            lost(data: any): void {
                back(false, '请求失败！');
            },
            timeOut(data: any): void {
                back(false, '请求超时！');
            },
        } as DataBackAction;

        this.setting.groupId = this.groupId;
        const controller: GroupJoinSettingController = app.appContext.getMaterial(GroupJoinSettingController);
        controller.updateJoinSetting(this.setting, this.questionData.questions, dataBackAction);
    }


    private loadData() {
        const own = this;
        const back: DataBackAction = {
            back(d: any): void {
                if (d) {
                    const info = d.info;
                    if (info) {
                        if (info.success && d.body) {
                            const questionList: GroupJoinVerifyQuestion[] = d.body.questions;
                            const joinSetting: GroupJoinSetting = d.body.setting;
                            own.setSetting(joinSetting, questionList);
                        }
                    }
                }
            },
            lost(data: any): void {
                Prompt.notice('请求失败！');
            },
            timeOut(data: any): void {
                Prompt.notice('请求超时！');
            },
        } as DataBackAction;
        const controller: GroupJoinSettingController = app.appContext.getMaterial(GroupJoinSettingController);
        controller.getJoinSetting(this.groupId, back);
    }

    private setSetting(data: GroupJoinSetting, list: GroupJoinVerifyQuestion[]) {
        if (!data) {
            data = new GroupJoinSetting();
        }
        if (!list) {
            list = [];
        }
        this.setting = data;
        this.questionData.questions = list;
    }

    private keyChange(groupId: string): void {
        // no
        const personalGroupMemberListBox: GroupMemberListOfPersonalBox = app.appContext.getMaterial(GroupMemberListOfPersonalBox);
        const position = personalGroupMemberListBox.getPosition(groupId);
        this.isOwner = (GroupMember.POSITION_OWNER === position);
    }
}
