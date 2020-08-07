import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import NetModule from '@/app/com/common/module/NetModule';

export default abstract class AbstractSender extends AbstractMaterial {

    public send(data: any, back?: DataBackAction, parallel?: boolean): void {
        const netModule: NetModule = this.appContext.getMaterial(NetModule);
        netModule.send(data, back, parallel);
    }
}
