import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';

export default class IconItemData {
    public active: boolean = false;
    public key: string = '';
    public name: string = '';
    public avatar: string = UserInfoUtil.USER_DEFAULT_AVATAR;
    public gray: boolean = true;
    public red: boolean = false;
    public redCount: number = 0;
    public text: string = '';
    public time: string = '';
    public lastTimestamp: number = 0;
    public onSelect: any;
    public onDelete: any;
    private data: any;

    public setData(data: any) {
        this.data = data;
    }

    public getData(): any {
        return this.data;
    }
}
