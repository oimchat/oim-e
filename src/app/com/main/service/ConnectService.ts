import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import SystemAuthSender from '@/app/com/main/sender/SystemAuthSender';

export default class ConnectService extends AbstractMaterial {

    public connect(host: string, back: (success: boolean, message?: string) => void): void {

        const onOpen: () => void = () => {
            back(true);
        };

        const mark: boolean = this.appContext.connect(host, onOpen);
        if (!mark) {
            back(mark, '连接失败！');
        }
    }
}
