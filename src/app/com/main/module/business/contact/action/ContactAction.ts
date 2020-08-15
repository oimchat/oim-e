import {MethodMapping} from '@/app/base/action/annotation/ActionDecorator';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import ContactInformationConverge from '@/app/com/main/module/business/contact/converge/ContactInformationConverge';

export default class ContactAction extends AbstractMaterial {

    private static action: string = '1.2.001';


    @MethodMapping(ContactAction, ContactAction.action, '1.2.0001')
    public addApply(data: any): void {
        if (data && data.body) {
            const contactInformationConverge: ContactInformationConverge = this.appContext.getMaterial(ContactInformationConverge);
            contactInformationConverge.addApplyInformation(1);
        }
    }
}
