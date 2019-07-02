import AbstractMaterial from '@/app/base/AbstractMaterial';
import ServerAddress from '@/app/com/bean/ServerAddress';
import ServerBox from '@/app/com/main/box/ServerBox';


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

