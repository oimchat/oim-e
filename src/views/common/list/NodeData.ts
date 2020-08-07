import ItemData from './ItemData';

export default class NodeData {
    public key: string = '';
    public name: string = '';
    public sort: number = 0;
    public countText: string = '[0/0]';
    public items: ItemData[] = new Array<ItemData>();
    public isOpen: boolean = false;
    public red: boolean = false;
    public redCount: number = 0;
}

