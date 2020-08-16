import IconItemData from '@/views/common/list/IconItemData';
import IconItemBox from '@/views/common/list/IconItemBox';

class MessageListModel {

    public list: IconItemData[] = [];
    public box: IconItemBox = new IconItemBox();

    private map: Map<string, IconItemData> = new Map<string, IconItemData>();

    public addOrUpdateItem(type: string,
                           key: string,
                           name: string,
                           avatar: string,
                           gray: boolean,
                           value: any,
                           onSelect: (key: string, value: any) => void,
                           onDelete: (userId: string, value: any) => void): void {
        const id = this.getId(type, key);
        let item = this.map.get(id);
        if (!item) {
            item = new IconItemData();
            this.map.set(id, item);
            this.list.push(item);
        }
        const lastTimestamp = new Date().getTime();
        item.lastTimestamp = lastTimestamp;

        item.key = key;
        item.name = name;
        item.avatar = avatar;
        item.gray = gray;
        item.setData(value);
        item.onSelect = onSelect;
        item.onDelete = onDelete;
        this.sort(this.list);
    }

    public isItemShowing(type: string, key: string): boolean {
        const id = this.getId(type, key);
        const item = this.map.get(id);
        let show: boolean = false;
        if (item) {
            show = item.active;
        }
        return false;
    }

    public removeItem(type: string, key: string): void {
        const id = this.getId(type, key);
        const item = this.map.get(id);
        this.map.delete(id);
        if (item) {
            const index = this.list.indexOf(item);
            if (index > -1) {
                this.list.splice(index, 1);
            }
        }
    }

    public setItemRed(type: string, key: string, red: boolean, count: number): void {
        const id = this.getId(type, key);
        const item = this.map.get(id);
        if (item) {
            item.red = red;
            item.redCount = count;
        }
    }

    public updateItemText(type: string, key: string, text: string, timeText: string, timestamp: number): void {
        const id = this.getId(type, key);
        const item = this.map.get(id);
        if (item) {
            item.text = text;
            item.time = timeText;
            item.lastTimestamp = timestamp;
            this.sort(this.list);
        }
    }

    public selectItem(type: string, key: string) {
        const id = this.getId(type, key);
        const item = this.map.get(id);
        if (item) {
            this.box.select(item);
        }
    }

    public hasItem(type: string, key: string) {
        const id = this.getId(type, key);
        return this.map.has(id);
    }

    public clear() {
        this.list = [];
        this.map = new Map<string, IconItemData>();
        this.box = new IconItemBox();
    }

    private sort(list: IconItemData[]) {
        if (list) {
            list.sort((a: IconItemData, b: IconItemData) => {
                const timestamp1: number = a.lastTimestamp;
                const timestamp2: number = b.lastTimestamp;
                return timestamp2 - timestamp1;
            });
        }
    }

    private getId(type: string, key: string): string {
        const id = type + '_' + key;
        return id;
    }
}

export default new MessageListModel();
