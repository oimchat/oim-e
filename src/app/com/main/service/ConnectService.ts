import AbstractMaterial from '@/app/base/context/AbstractMaterial';


import NetModule from '@/app/com/common/module/NetModule';

export default class ConnectService extends AbstractMaterial {

    public connect(host: string, back: (success: boolean, message?: string) => void): void {
        const onOpen: () => void = () => {
            back(true);
        };
        const netModule: NetModule = this.appContext.getMaterial(NetModule);
        const mark: boolean = netModule.connect(host, onOpen);
        if (!mark) {
            back(mark, '连接失败！');
        }
    }
}
