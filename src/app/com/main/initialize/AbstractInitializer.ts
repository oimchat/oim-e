import BaseInitializer from '@/app/com/main/initialize/BaseInitializer';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import AppContext from '@/app/base/context/AppContext';
import EnterInitializerBox from '@/app/com/main/initialize/EnterInitializerBox';

export default abstract class AbstractInitializer extends AbstractMaterial implements BaseInitializer {

    public constructor(protected appContext: AppContext) {
        super(appContext);
        const box: EnterInitializerBox = this.appContext.getMaterial(EnterInitializerBox);
        box.put(this);
    }

    public abstract getOrder(): number ;

    public abstract initialize(): void ;
}
