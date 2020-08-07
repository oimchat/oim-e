import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import SystemNetSender from '@/app/com/main/module/business/system/sender/SystemNetSender';


export default class SystemNetController extends AbstractMaterial {

    /**
     * 发送心跳
     */
    public heartbeat(): void {
        const sns: SystemNetSender = this.appContext.getMaterial(SystemNetSender);
        sns.heartbeat();
    }
}
