import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import BaseInitializer from '@/app/com/main/initialize/BaseInitializer';
import DataChange from '@/app/base/event/DataChange';
import AllMessageUnreadBox from '@/app/com/client/module/information/box/unread/AllMessageUnreadBox';
import AppContext from '@/app/base/context/AppContext';
import EnterInitializerBox from '@/app/com/main/initialize/EnterInitializerBox';

export default abstract class AbstractMessageUnreadBox extends AbstractMaterial implements BaseInitializer {


    private map: Map<string, number> = new Map<string, number>();
    private totalUnreadCount: number = 0;

    private changeEvents: Array<DataChange<{ key: string, unreadCount: number }>> = [];
    private allChangeEvents: Array<DataChange<number>> = [];

    public constructor(protected appContext: AppContext) {
        super(appContext);
        const box: EnterInitializerBox = this.appContext.getMaterial(EnterInitializerBox);
        box.put(this);
    }

    public plusUnread(key: string): void {
        this.plusUnreadCount(key, 1);
    }

    public plusUnreadCount(key: string, unreadCount: number): void {
        if (unreadCount < 0) {
            unreadCount = 0;
        }
        const count: number = this.getOrDefault(this.map, key, 0); // 获取聊天对象未读消息数量
        const allCount = count + unreadCount;
        this.map.set(key, allCount);

        const allMessageUnreadBox: AllMessageUnreadBox = this.appContext.getMaterial(AllMessageUnreadBox);
        allMessageUnreadBox.plusUnread(unreadCount);

        this.handleEvent(key);
        this.handleAllEvent();
    }

    public setUnreadCount(key: string, count: number) {
        if (count < 0) {
            count = 0;
        }
        const oldCount: number = this.getOrDefault(this.map, key, 0);
        this.map.set(key, count);
        const newTotalCount: number = (this.totalUnreadCount - oldCount) + count;
        if (newTotalCount >= 0) {
            this.totalUnreadCount = newTotalCount;
        }

        const allMessageUnreadBox: AllMessageUnreadBox = this.appContext.getMaterial(AllMessageUnreadBox);
        allMessageUnreadBox.minusUnread(oldCount);

        this.handleEvent(key);
        this.handleAllEvent();
    }

    public getUnreadCount(key: string): number {
        const count: number = this.getOrDefault(this.map, key, 0);
        return count;
    }

    public getTotalUnreadCount(): number {
        return this.totalUnreadCount;
    }

    public getOrder(): number {
        return 0;
    }

    public initialize(): void {
        // no
    }

    public addAllChangeEvent(e: DataChange<number>) {
        if (!this.allChangeEvents.includes(e)) {
            this.allChangeEvents.push(e);
        }
    }

    public addChangeEvent(e: DataChange<{ key: string, unreadCount: number }>) {
        if (!this.changeEvents.includes(e)) {
            this.changeEvents.push(e);
        }
    }

    private handleAllEvent(): void {
        for (const e of this.allChangeEvents) {
            e.change(this.getTotalUnreadCount());
        }
    }

    private handleEvent(key: string): void {
        const unreadCount = this.getUnreadCount(key);
        for (const e of this.changeEvents) {
            e.change({key, unreadCount});
        }
    }

    private totalUnread(): void {
        this.totalUnreadCount++;
    }

    private getOrDefault(map: Map<string, number>, key: string, count: number): number {
        let size = map.get(key);
        if (!size) {
            size = count;
        }
        return size;
    }
}
