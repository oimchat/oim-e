import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';
import ContactHarassSetting from '@/app/com/bean/ContactHarassSetting';
import ContactVerifyQuestion from '@/app/com/data/ContactVerifyQuestion';

export default class ContactHarassSettingSender extends AbstractMaterial {
    private action: string = '1.2.004';

    public get(back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0001');
        m.body = {};
        this.appContext.netServer.send(m, back, parallel);
    }

    public update(setting: ContactHarassSetting, questionList: ContactVerifyQuestion[], back?: DataBackAction, parallel?: boolean): void {
        const m = Message.build(this.action, '1.1.0002');
        m.body = {};
        m.body.setting = setting;
        m.body.questions = questionList;
        this.appContext.netServer.send(m, back, parallel);
    }
}
