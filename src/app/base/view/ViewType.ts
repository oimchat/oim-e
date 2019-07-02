import AbstractMaterial from '@/app/base/AbstractMaterial';
import AppContext from '@/app/base/AppContext';

type ViewType<T extends AbstractMaterial> = new(appContext: AppContext) => T;

export default ViewType;
