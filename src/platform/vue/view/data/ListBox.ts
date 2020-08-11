import NodeData from '@/views/common/list/NodeData';
import ItemData from '@/views/common/list/ItemData';

class ListBox {

    public nodes: NodeData[] = [];

    private nodeMap: Map<string, NodeData> = new Map<string, NodeData>();
    private itemMap: Map<string, ItemData> = new Map<string, ItemData>();

    public addOrUpdateNode(key: string, name: string, sort?: number, countText?: string) {
        let node = this.nodeMap.get(key);
        if (!node) {
            node = new NodeData();
            this.nodeMap.set(key, node);
            if (sort && sort >= 0) {
                this.nodes.splice(sort, 0, node);
            } else {
                this.nodes.push(node);
            }
        }
        node.key = key;
        node.name = name;
        if (sort) {
            node.sort = sort;
        }
        if (countText) {
            node.countText = countText;
        }
    }

    public updateNodeCount(key: string, countText: string): void {
        const node = this.nodeMap.get(key);
        if (node) {
            node.countText = countText;
        }
    }

    public deleteNode(nodeKey: string) {
        const node = this.nodeMap.get(nodeKey);
        if (node) {
            this.nodeMap.delete(nodeKey);
            const index = this.nodes.indexOf(node);
            if (index > -1) {
                this.nodes.splice(index, 1);
            }
            if (node.items) {
                for (const item of node.items) {
                    this.itemMap.delete(item.key);
                }
            }
        }
    }

    public isNodeShowing(nodeKey: string): boolean {
        let showing: boolean = false;
        const node = this.nodeMap.get(nodeKey);
        if (node) {
            showing = node.isOpen;
        }
        return showing;
    }

    public setNodeRed(key: string, red: boolean, count: number): void {
        const node = this.nodeMap.get(key);
        if (node) {
            node.red = red;
            node.redCount = count;
        }
    }

    public updateSort(): void {
        this.nodes.sort((a: NodeData, b: NodeData) => {
            let r = 0;
            if (a.sort === b.sort) {
                r = 0;
            } else if (a.sort > b.sort) {
                r = 1;
            } else {
                r = -1;
            }
            return r;
        });
    }

    public clearNode(): void {
        const length = this.nodes.length;
        this.nodes.splice(0, length);
        this.nodeMap.clear();
        this.itemMap.clear();
    }

    public addOrUpdateItem(nodeKey: string, itemKey: string, name: string, avatar: string, gray: boolean) {
        const node = this.getNodeOrCreate(nodeKey);

        let item = this.itemMap.get(itemKey);
        if (!item) {
            item = new ItemData();
            this.itemMap.set(itemKey, item);
            node.items.push(item);
        }
        item.key = itemKey;
        item.avatar = avatar;
        item.name = name;
        item.gray = gray;
    }


    public getItemByKey(key: string): ItemData {
        const item: any = this.itemMap.get(key);
        return item;
    }

    public setItemRed(nodeKey: string, itemKey: string, red: boolean, count: number): void {
        const item: ItemData | any = this.itemMap.get(itemKey);
        if (item) {
            item.red = red;
            item.redCount = count;
        }
    }

    public updateItemText(categoryId: string, itemKey: string, text: string, time: string) {
        const item: ItemData | any = this.itemMap.get(itemKey);
        if (item) {
            item.text = text;
        }
    }

    public deleteItem(nodeKey: string, itemKey: string): void {
        const node = this.nodeMap.get(nodeKey);
        const item = this.itemMap.get(itemKey);
        this.itemMap.delete(itemKey);
        if (node && item) {
            if (node.items) {
                const index = node.items.indexOf(item);
                if (index > -1) {
                    node.items.splice(index, 1);
                }
            }
        }
    }

    public clearItems(nodeKey: string) {
        const node = this.nodeMap.get(nodeKey);
        if (node) {
            if (node.items) {
                for (const item of node.items) {
                    this.itemMap.delete(item.key);
                }
                const length = node.items.length;
                node.items.splice(0, length);
            }
        }
    }

    private getNodeOrCreate(key: string): NodeData {
        let node = this.nodeMap.get(key);
        if (!node) {
            node = new NodeData();
            this.nodeMap.set(key, node);
            this.nodes.push(node);
        }
        return node;
    }
}

export default ListBox;
