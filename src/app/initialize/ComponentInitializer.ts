import Initializer from '@/app/base/initialize/Initializer';
import AppContext from '@/app/base/context/AppContext';
import DataChange from '@/app/base/event/DataChange';
import MessageAllUnreadManager from '@/app/com/client/module/information/manager/MessageAllUnreadManager';
import AllMessageUnreadBox from '@/app/com/client/module/information/box/unread/AllMessageUnreadBox';


export default class ComponentInitializer implements Initializer {


    public getOrder(): number {
        return 0;
    }

    public initialize(appContext: AppContext): void {
        this.initializeHandle(appContext);
    }

    public getKey(): string {
        const own: object = this;
        return own.constructor.name;
    }

    public initializeHandle(appContext: AppContext) {
        const change: DataChange<number> = {
            change(count: number) {
                const red = (count > 0);
                const messageAllUnreadManager: MessageAllUnreadManager = appContext.getMaterial(MessageAllUnreadManager);
                messageAllUnreadManager.setItemRed(red, count);
            },
        } as DataChange<number>;

        const allMessageUnreadBox: AllMessageUnreadBox = appContext.getMaterial(AllMessageUnreadBox);
        allMessageUnreadBox.addChangeEvent(change);
    }
}
