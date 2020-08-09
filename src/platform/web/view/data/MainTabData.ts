class MainTabData {
    public icon: string = '';
    public title: string = '';
    public key: string = '';
    public red: boolean = false;
    public redCount: number = 0;
    private onSelected: any;

    public setOnSelected(onSelected: (data: MainTabData) => void) {
        this.onSelected = onSelected;
    }

    public doOnSelected() {
        if (typeof this.onSelected === 'function') {
            this.onSelected(this);
        }
    }

    public equalKey(key: string): boolean {
        return this.key === key;
    }
}

export default MainTabData;
