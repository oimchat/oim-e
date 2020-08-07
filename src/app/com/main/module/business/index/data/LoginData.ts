import Client from '@/app/base/message/client/Client';
import LoginUser from '@/app/com/main/module/business/index/data/LoginUser';

export default class LoginData {
    public client: Client = new Client();
    public user: LoginUser = new LoginUser();
}
