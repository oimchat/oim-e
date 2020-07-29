import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import AppContext from '@/app/base/context/AppContext';

type ViewType<T extends AbstractMaterial> = new(appContext: AppContext) => T;

export default ViewType;
