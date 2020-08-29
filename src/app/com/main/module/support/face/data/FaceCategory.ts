import FaceItem from '@/app/com/main/module/support/face/data/FaceItem';

export default class FaceCategory {
    public id: string = '';
    public name: string = '';
    public visible: boolean = true;
    public faces: FaceItem[] = [];
}
