import DataBackAction from '@/app/base/net/DataBackAction';

export default abstract class AbstractDataBackAction implements DataBackAction {

    public back(data: any): void {
        // TODO
    }

    public lost(data: any): void {
        // TODO
    }

    public timeOut(data: any): void {
        // TODO
    }

}
