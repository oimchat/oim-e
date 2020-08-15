import DataBackAction from '@/app/base/net/DataBackAction';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import Prompter from '@/app/com/client/component/Prompter';

export default class DefaultDataBackAction extends AbstractMaterial implements DataBackAction {

    public back(data: any): void {
        // do nothing
    }

    public lost(data: any): void {
        const prompter: Prompter = this.appContext.getMaterial(Prompter);
        prompter.prompt('请求失败!', undefined, 'warn');
    }

    public timeOut(data: any): void {
        const prompter: Prompter = this.appContext.getMaterial(Prompter);

        prompter.prompt('请求超时!', undefined, 'warn');
    }
}
