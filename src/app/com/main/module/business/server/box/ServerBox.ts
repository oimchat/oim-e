import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import ServerData from '@/app/com/main/module/business/server/data/ServerData';
import ServerAddress from '@/app/com/main/module/business/server/bean/ServerAddress';
import {Protocol, ServerType} from '@/app/common/config/constant/ServerConstant';

export default class ServerBox extends AbstractMaterial {

    private map: Map<string, ServerData> = new Map<string, ServerData>();


    public addList(list: ServerData[]): void {
        if (list) {
            for (const data of list) {
                this.add(data);
            }
        }
    }

    public add(data: ServerData): void {
        if (data) {
            this.map.set(data.code, data);
        }
    }

    public getServer(code: string): ServerData {
        const data: ServerData | any = this.map.get(code);
        return data;
    }

    public getAddressList(code: string): ServerAddress[] {
        let list: ServerAddress[] = [];
        const data: ServerData | any = this.getServer(code);
        // if (data instanceof ServerData) {
        if (data) {
            list = data.addresses;
        }
        // }
        if (!list) {
            list = [];
        }
        return list;
    }

    public getAddress(code: string, protocol: string): ServerAddress | null {
        let address: ServerAddress | null = null;
        const list: ServerAddress[] = this.getAddressList(code);
        if (list) {
            for (const data of list) {
                if ((protocol === data.protocol) && data.enabled) {
                    address = data;
                    break;
                }
            }
        }
        return address;
    }

    public hasAddress(code: string, protocol: string): boolean {
        let has = false;
        const address = this.getAddress(ServerType.file, Protocol.HTTP);
        has = !(!address || !address.enabled);
        return has;
    }
}
