import ChatWriteViewEntity from '@/platform/vue/view/entity/ChatWriteViewEntity';

export default class ChatWriteViewEntityDefaultImpl implements ChatWriteViewEntity {

    public setInnerHTML(html: string): void {
        // no
    }

    public getInnerHTML(): string {
        return '';
    }
}

