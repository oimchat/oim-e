import WriteExtend from '@/views/common/chat/extend/WriteExtend';
import WriteMapper from '@/views/common/chat/WriteMapper';
import MacScreenShot from '@/platform/e/os/mac/screenshot/MacScreenShot';


export class MacScreenshotExtend implements WriteExtend {
    private screenShot: MacScreenShot = new MacScreenShot();

    public invoke(writeMapper: WriteMapper): void {
        this.screenShot.handleScreenShots();
    }
}
