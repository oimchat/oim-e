import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataChange from '@/app/base/event/DataChange';

export default class AllMessageUnreadBox extends AbstractMaterial {

    private map: Map<string, number> = new Map<string, number>();
    private totalUnreadCount: number = 0;

    private changeEvents: Array<DataChange<number>> = [];

    public plusUnread(count: number): number {
        if (count >= 0) {
            this.totalUnreadCount = this.totalUnreadCount + count;
        } else {
            this.plusTotalUnread();
        }
        this.handleEvent();
        return this.totalUnreadCount;
    }

    public minusUnread(count: number): number {
        if (count >= 0) {
            this.totalUnreadCount = this.totalUnreadCount - count;
        } else {
            this.minusTotalUnread();
        }
        if (this.totalUnreadCount < 0) {
            this.totalUnreadCount = 0;
        }
        this.handleEvent();
        return this.totalUnreadCount;
    }

    public setUnreadCount(count: number) {
        if (count < 0) {
            count = 0;
        }
        if (count >= 0) {
            this.totalUnreadCount = count;
        }
        this.handleEvent();
    }

    public getTotalUnreadCount(): number {
        return this.totalUnreadCount;
    }

    public addChangeEvent(e: DataChange<number>) {
        this.changeEvents.push(e);
    }

    private plusTotalUnread(): void {
        this.totalUnreadCount++;
    }

    private minusTotalUnread(): void {
        this.totalUnreadCount--;
    }

    private handleEvent(): void {
        for (const e of this.changeEvents) {
            e.change(this.getTotalUnreadCount());
        }
    }
}
