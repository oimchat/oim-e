import app from '@/app/App';
import AllMessageUnreadBox from '@/app/com/main/box/AllMessageUnreadBox';
import DataChange from '@/app/base/event/DataChange';
import systemTrayBlinkDetection from '@/platform/SystemTrayBlinkDetection';

class PlatformInitialize {

    public constructor() {
        // this.initializeView();
    }

    public initialize(): void {
        this.initializeUnread();
    }

    private initializeUnread() {
        // tslint:disable-next-line:max-classes-per-file new-parens
        const change: DataChange<number> = new class implements DataChange<number> {
            public change(count: number): void {
                if (count > 0) {
                    systemTrayBlinkDetection.setBlink(true);
                } else {
                    systemTrayBlinkDetection.setBlink(false);
                }
            }
        };
        const allMessageUnreadBox: AllMessageUnreadBox = app.appContext.getMaterial(AllMessageUnreadBox);
        allMessageUnreadBox.addChangeEvent(change);
    }
}

export default new PlatformInitialize();
