import User from '@/app/com/main/module/business/user/bean/User';

export default class RegisterData extends User {
    public password: string = '';
    public tempPassword: string = '';
    public repeatPassword: string = '';
}
