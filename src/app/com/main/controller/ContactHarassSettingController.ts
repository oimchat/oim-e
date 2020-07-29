import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import ContactHarassSetting from '@/app/com/bean/ContactHarassSetting';
import ContactVerifyQuestion from '@/app/com/data/ContactVerifyQuestion';
import ContactHarassSettingSender from '@/app/com/main/sender/ContactHarassSettingSender';


export default class ContactHarassSettingController extends AbstractMaterial {

    public get(back?: DataBackAction, parallel?: boolean): void {
        const sender: ContactHarassSettingSender = this.appContext.getMaterial(ContactHarassSettingSender);
        sender.get(back, parallel);
    }

    public update(data: ContactHarassSetting, questionList: ContactVerifyQuestion[], back?: DataBackAction, parallel?: boolean): void {
        const sender: ContactHarassSettingSender = this.appContext.getMaterial(ContactHarassSettingSender);
        sender.update(data, questionList, back, parallel);
    }
}
