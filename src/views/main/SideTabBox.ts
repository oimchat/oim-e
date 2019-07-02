import sideTabData from '@/views/main/SideTabData';

class SideTabBox {

    // @ts-ignore
    private data: sideTabData = null;

    public select(data: sideTabData): void {
        if (this.data) {
            this.data.selected = false;
            this.updateImage(this.data);
        }
        this.data = data;
        if (data) {
            data.selected = true;
            this.updateImage(data);
            data.doOnSelected();
        }
    }

    public updateImage(data: sideTabData): void {
        if (data && data.selected) {
            data.image = data.selectedImage;
        } else {
            data.image = data.normalImage;
        }
    }
}

export default SideTabBox;
