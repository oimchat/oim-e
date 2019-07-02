import AbstractMaterial from '@/app/base/AbstractMaterial';

export default class AllMessageUnreadBox extends AbstractMaterial {

    private map: Map<string, number> = new Map<string, number>();
    private totalUnreadCount: number = 0;

    public plusUnread(count?: number): number {
        if (count && count > 0) {
            this.totalUnreadCount = this.totalUnreadCount + count;
        } else {
            this.plusTotalUnread();
        }
        return this.totalUnreadCount;
    }

    public minusUnread(count?: number): number {
        if (count && count > 0) {
            this.totalUnreadCount = this.totalUnreadCount - count;
        } else {
            this.minusTotalUnread();
        }
        if (this.totalUnreadCount < 0) {
            this.totalUnreadCount = 0;
        }
        return this.totalUnreadCount;
    }

    public setUnreadCount(count: number) {
        if (count < 0) {
            count = 0;
        }
        if (count >= 0) {
            this.totalUnreadCount = count;
        }
    }

    public getTotalUnreadCount(): number {
        return this.totalUnreadCount;
    }

    private plusTotalUnread(): void {
        this.totalUnreadCount++;
    }

    private minusTotalUnread(): void {
        this.totalUnreadCount--;
    }
}
