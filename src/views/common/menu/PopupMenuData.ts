export default class PopupMenuData {

    public target: string | boolean = true;
    public showing: boolean = false;
    public contextMenu: boolean = false;
    public list: any[] = [];

    public show() {
        this.showing = true;
    }

    public hide() {
        this.showing = false;
    }
}
