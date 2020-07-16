/**
 * 登录成功初始化
 */
import AppContext from '@/app/base/AppContext';

export default interface LaunchInitialize {
    execute(appContext: AppContext): void;
}
