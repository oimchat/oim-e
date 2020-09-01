import Initializer from '@/app/base/initialize/Initializer';
import AppContext from '@/app/base/context/AppContext';
import FaceBox from '@/app/com/main/module/support/face/box/FaceBox';
import WebClassicalBag from '@/platform/common/web/face/WebClassicalBag';
import WebEmojiBag from '@/platform/common/web/face/WebEmojiBag';

export default class WebPlatformFaceInitializer implements Initializer {

    public getOrder(): number {
        return 0;
    }

    public getKey(): string {
        const own: object = this;
        return own.constructor.name;
    }

    public initialize(appContext: AppContext): void {
        this.initializeHandle(appContext);
    }

    public initializeHandle(appContext: AppContext) {
        const faceBox: FaceBox = appContext.getMaterial(FaceBox);
        faceBox.addBag(new WebClassicalBag());
        faceBox.addBag(new WebEmojiBag());
    }
}
