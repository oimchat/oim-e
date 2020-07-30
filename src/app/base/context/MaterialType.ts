import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import AppContext from '@/app/base/context/AppContext';

export type MaterialType<T extends AbstractMaterial> = new(appContext: AppContext) => T;
