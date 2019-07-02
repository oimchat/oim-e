import DataBackAction from '@/app/base/net/DataBackAction';

export default class HandleData {
    public data: any;
    public back?: DataBackAction;
    public parallel: boolean = false;
    public sendTimestamp: number = 0;
}
