import AppContext from '@/app/base/AppContext';

/**
 * 系统启动时初始化
 */
export default interface LaunchInitialize {
    execute(appContext: AppContext): void;
}
