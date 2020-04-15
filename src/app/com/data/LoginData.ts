import Client from '@/app/base/message/client/Client';
import LoginUser from '@/app/com/data/LoginUser';

export default class LoginData {
    public client: Client = new Client();
    public user: LoginUser = new LoginUser();
}
