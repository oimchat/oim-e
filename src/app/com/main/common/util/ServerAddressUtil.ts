import ServerAddress from '@/app/com/main/module/business/server/bean/ServerAddress';
import {AddressType, Protocol} from '@/app/common/config/constant/ServerConstant';

export default class ServerAddressUtil {

    public static convertHttpUrl(address: ServerAddress): string {
        let url = '';
        if (address) {
            if (Protocol.HTTP === address.protocol) {
                if (AddressType.URL === address.addressType) {
                    url = address.address;
                } else if (AddressType.IPv4 === address.addressType) {
                    url = 'http://' + address.address + ':' + address.port;
                } else if (AddressType.IPv6 === address.addressType) {
                    url = 'http://[' + address.address + ']:' + address.port;
                }
            }
            if (Protocol.HTTPS === address.protocol) {
                if (AddressType.URL === address.addressType) {
                    url = address.address;
                } else if (AddressType.IPv4 === address.addressType) {
                    url = 'https://' + address.address + ':' + address.port;
                } else if (AddressType.IPv6 === address.addressType) {
                    url = 'https://[' + address.address + ']:' + address.port;
                }
            }
        }
        return url;
    }
}
