import AppContext from '@/app/base/context/AppContext';

export default interface Material {

    discriminator: 'App-Material';

    setAppContext(appContext: AppContext): void;
}

