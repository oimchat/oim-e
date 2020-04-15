import Info from '@/app/base/message/Info';
import Message from '@/app/base/message/Message';
import ClientHead from '@/app/base/message/client/ClientHead';
import Head from '@/app/base/message/Head';


export default class InfoMessage<H extends Head> extends Message<H> {

    public static build(action: string, method: string): InfoMessage<ClientHead> {
        const head: ClientHead = ClientHead.build(action, method);
        const me: InfoMessage<ClientHead> = new InfoMessage<ClientHead>();
        me.head = head;
        return me;
    }

    public info!: Info;
}
