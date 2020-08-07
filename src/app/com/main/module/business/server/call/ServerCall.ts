import http from '@/app/lib/http/HttpClient';

class ServerCall {

    public getAddressList(back: (data: any) => void): void {
        http.post('/portal/v1/config/server/address.list', {}, back, true);
    }
}

export default new ServerCall();
