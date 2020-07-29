import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import AppContext from '@/app/base/context/AppContext';

// export default interface ActionType<T extends AbstractMaterial> extends Function {
//
// }
type ActionType<T extends AbstractMaterial> = new(appContext: AppContext) => T;


export default ActionType;
