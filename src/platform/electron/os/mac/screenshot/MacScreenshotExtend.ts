import WriteExtend from '@/views/component/chat/extend/WriteExtend';
import WriteMapper from '@/views/component/chat/WriteMapper';
import MacScreenShot from '@/platform/electron/os/mac/screenshot/MacScreenShot';


export class MacScreenshotExtend implements WriteExtend {
    private screenShot: MacScreenShot = new MacScreenShot();

    public invoke(writeMapper: WriteMapper): void {
        this.screenShot.handleScreenShots();
    }
}
