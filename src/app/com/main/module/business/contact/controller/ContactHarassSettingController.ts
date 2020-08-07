import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import ContactHarassSetting from '@/app/com/main/module/business/contact/bean/ContactHarassSetting';
import ContactVerifyQuestion from '@/app/com/main/module/business/contact/data/ContactVerifyQuestion';
import ContactHarassSettingSender from '@/app/com/main/module/business/contact/sender/ContactHarassSettingSender';


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
