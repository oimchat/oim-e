import UserInfoUtil from '@/app/com/main/common/util/UserInfoUtil';

export default class PersonalData {
    public key: string = '';
    public name: string = '';
    public text: string = '';
    public avatar: string = UserInfoUtil.USER_DEFAULT_AVATAR;
}
