import LaunchInitializer from '@/app/base/initialize/LaunchInitializer';
import AppContext from '@/app/base/context/AppContext';
import FaceBox from '@/app/com/main/module/support/face/box/FaceBox';
import WebClassicalBag from '@/platform/common/web/face/WebClassicalBag';
import WebEmojiBag from '@/platform/common/web/face/WebEmojiBag';

export default class WebPlatformFaceInitializer extends LaunchInitializer {

    public getOrder(): number {
        return 0;
    }

    public initialize(): void {
        this.initializeHandle(this.appContext);
    }

    public getKey(): string {
        const own: object = this;
        return own.constructor.name;
    }

    public initializeHandle(appContext: AppContext) {
        const faceBox: FaceBox = appContext.getMaterial(FaceBox);
        faceBox.addBag(new WebClassicalBag());
        faceBox.addBag(new WebEmojiBag());
    }
}
