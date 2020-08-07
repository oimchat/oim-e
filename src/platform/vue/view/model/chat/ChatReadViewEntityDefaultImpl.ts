import ChatReadViewEntity from '@/platform/vue/view/model/chat/ChatReadViewEntity';

class ChatReadViewEntityDefaultImpl implements ChatReadViewEntity {

    public getScrollHeight(): number {
        return 0;
    }

    public updateScroll(size: number): void {
        // no
    }

    public updateScrollIntoView(viewId: string): void {
        // no
    }
}

export default ChatReadViewEntityDefaultImpl;
