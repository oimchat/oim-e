import AppContext from '@/app/base/context/AppContext';

type InitializerType<T extends Initializer> = new(appContext: AppContext) => T;

export default interface Initializer {

    initialize(appContext: AppContext): void;

    getOrder(): number;

    getKey(): string;
}
