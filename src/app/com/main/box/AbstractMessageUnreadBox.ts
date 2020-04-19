import AbstractMaterial from '@/app/base/AbstractMaterial';

export default class AbstractMessageUnreadBox extends AbstractMaterial {

    private map: Map<string, number> = new Map<string, number>();
    private totalUnreadCount: number = 0;

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
    }

    public getUnreadCount(key: string): number {
        const count: number = this.getOrDefault(this.map, key, 0);
        return count;
    }

    public getTotalUnreadCount(): number {
        return this.totalUnreadCount;
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
