import AbstractMaterial from '@/app/base/context/AbstractMaterial';

export default abstract class ChatBaseManager extends AbstractMaterial {

    protected loadMap: Map<string, boolean> = new Map<string, boolean>();

}
