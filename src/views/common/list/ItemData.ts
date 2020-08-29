import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';

export default class ItemData {
    public active: boolean = false;
    public key: string = '';
    public name: string = '';
    public text: string = '';
    public avatar: string = UserInfoUtil.USER_DEFAULT_AVATAR;
    public gray: boolean = true;
    public red: boolean = false;
    public redCount: number = 0;
    public data: any;
}
