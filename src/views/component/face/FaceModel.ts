export default class FaceModel {

    public visible: boolean = false;
    public x: number = 0;
    public y: number = 0;

    public show(x: number, y: number): void {
        this.x = x;
        this.y = y;
        this.visible = true;
    }
}
