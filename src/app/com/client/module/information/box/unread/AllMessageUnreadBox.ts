import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import DataChange from '@/app/base/event/DataChange';
import AppContext from '@/app/base/context/AppContext';
import EnterInitializerBox from '@/app/com/main/initialize/EnterInitializerBox';
import BaseInitializer from '@/app/com/main/initialize/BaseInitializer';

export default class AllMessageUnreadBox extends AbstractMaterial implements BaseInitializer {

    private map: Map<string, number> = new Map<string, number>();
    private totalUnreadCount: number = 0;

    private changeEvents: Array<DataChange<number>> = [];

    public constructor(protected appContext: AppContext) {
        super(appContext);
        const box: EnterInitializerBox = this.appContext.getMaterial(EnterInitializerBox);
        box.put(this);
    }
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
        if (!this.changeEvents.includes(e)) {
            this.changeEvents.push(e);
        }
    }

    public getOrder(): number {
        return 0;
    }

    public initialize(): void {
        // no
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
