import AbstractInitializer from '@/app/com/main/initialize/AbstractInitializer';
import MessageListView from '@/app/com/client/module/message/view/MessageListView';
import WorkViewEnum from '@/app/com/common/view/WorkViewEnum';

export default class ViewInitializer extends AbstractInitializer {

    public getOrder(): number {
        return 1;
    }

    public initialize(): void {
        this.initializeView();
    }

    public initializeView(): void {
        const messageListView: MessageListView = this.appContext.getView(WorkViewEnum.MessageListView);
        messageListView.clear();
    }
}
