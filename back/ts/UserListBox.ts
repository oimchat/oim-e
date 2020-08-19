import NodeData from '../views/common/list/NodeData';
import ItemData from '../views/common/list/ItemData';

class UserListBox {
    public userNodes: NodeData[] = [];

    private nodeMap: Map<string, NodeData> = new Map<string, NodeData>();
    private itemMap: Map<string, ItemData> = new Map<string, ItemData>();

    public addOrUpdateNode(key: string, name: string, countText: string) {
        let node = this.nodeMap.get(key);
        if (!node) {
            node = new NodeData();
            this.nodeMap.set(key, node);
            this.userNodes.push(node);
        }
        node.key = key;
        node.name = name;
        node.countText = countText;
    }

    public addOrUpdateItem(nodeKey: string, itemKey: string, name: string, avatar: string) {
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

        this.updateNodeCount(node);
    }

    private getNodeOrCreate(key: string): NodeData {
        let node = this.nodeMap.get(key);
        if (!node) {
            node = new NodeData();
            this.nodeMap.set(key, node);
            this.userNodes.push(node);
        }
        return node;
    }

    private updateNodeCount(node: NodeData): void {
        if (node) {
            let count = 0;
            const items = node.items;
            if (items) {
                count = items.length;
            }
            node.countText = '[' + count + ']';
        }
    }
}

export default new UserListBox();
