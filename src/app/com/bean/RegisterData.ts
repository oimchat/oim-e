import User from '@/app/com/bean/User';

export default class RegisterData extends User {
    public password: string = '';
    public tempPassword: string = '';
    public repeatPassword: string = '';
}
