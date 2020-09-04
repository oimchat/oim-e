import AppContext from '@/app/base/context/AppContext';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import BaseInitializer from '@/app/base/initialize/BaseInitializer';
import LaunchInitializerBox from '@/app/base/initialize/LaunchInitializerBox';

type InitializerType<T extends LaunchInitializer> = new(appContext: AppContext) => T;

export default abstract class LaunchInitializer extends AbstractMaterial implements BaseInitializer {

    public constructor(protected appContext: AppContext) {
        super(appContext);
        const box: LaunchInitializerBox = this.appContext.getMaterial(LaunchInitializerBox);
        box.put(this);
    }

    public abstract initialize(): void;

    public abstract getOrder(): number;

    public abstract getKey(): string;
}
