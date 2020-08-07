import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import ServerAddress from '@/app/com/main/module/business/server/bean/ServerAddress';
import ServerBox from '@/app/com/main/module/business/server/box/ServerBox';


export default class ServerController extends AbstractMaterial {

    public getAddress(code: string, protocol: string): ServerAddress | null {
        const serverBox: ServerBox = this.appContext.getMaterial(ServerBox);
        return serverBox.getAddress(code, protocol);
    }

    public hasAddress(code: string, protocol: string): boolean {
        const serverBox: ServerBox = this.appContext.getMaterial(ServerBox);
        return serverBox.hasAddress(code, protocol);
    }
}

