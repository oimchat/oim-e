import DataBackAction from '@/app/base/net/DataBackAction';
import AbstractMaterial from '@/app/base/AbstractMaterial';

export default class DefaultDataBackAction extends AbstractMaterial implements DataBackAction {

    public back(data: any): void {
        // do nothing
    }

    public lost(data: any): void {
        this.appContext.prompt('请求失败!', undefined, 'warn');
    }

    public timeOut(data: any): void {
        this.appContext.prompt('请求超时!', undefined, 'warn');
    }
}
