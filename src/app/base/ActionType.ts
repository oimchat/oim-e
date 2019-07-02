import AbstractMaterial from '@/app/base/AbstractMaterial';
import AppContext from '@/app/base/AppContext';

// export default interface ActionType<T extends AbstractMaterial> extends Function {
//
// }
type ActionType<T extends AbstractMaterial> = new(appContext: AppContext) => T;


export default ActionType;
