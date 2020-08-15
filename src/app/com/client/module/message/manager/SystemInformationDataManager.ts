import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import WorkViewEnum from '@/app/com/common/view/WorkViewEnum';
import MessageAreaView from '@/app/com/main/view/MessageAreaView';

export default class SystemInformationDataManager extends AbstractMaterial {

    public showByType(type: string) {
        const messageAreaView: MessageAreaView = this.appContext.getView(WorkViewEnum.MessageAreaView);
        messageAreaView.showType(type);
    }

    public isShowing(type: string): boolean {
        let showing = false;
        const messageAreaView: MessageAreaView = this.appContext.getView(WorkViewEnum.MessageAreaView);
        showing = (messageAreaView.getType() === type);
        return showing;
    }
}
