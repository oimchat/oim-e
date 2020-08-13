import ChatReadViewEntity from '@/platform/vue/view/entity/ChatReadViewEntity';

class ChatReadViewEntityDefaultImpl implements ChatReadViewEntity {

    public getScrollHeight(): number {
        return 0;
    }

    public setScrollTop(size: number): void {
        // no
    }

    public updateScrollIntoView(viewId: string): void {
        // no
    }
}

export default ChatReadViewEntityDefaultImpl;
