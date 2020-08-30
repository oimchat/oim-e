export default class SideTabData {
    public image: string = 'assets/general/web/images/main/tab/message_normal.png';
    public prompt: string = '消息列表';
    public normalImage: string = 'assets/general/web/images/main/tab/message_normal.png';
    public selectedImage: string = 'assets/general/web/images/main/tab/message_selected.png';
    public key: string = '';
    public selected: boolean = false;
    public red: boolean = false;
    public redCount: number = 0;
    private onSelected: any;

    public setOnSelected(onSelected: (data: SideTabData) => void) {
        this.onSelected = onSelected;
    }

    public doOnSelected() {
        if (typeof this.onSelected === 'function') {
            this.onSelected(this);
        }
    }
}
