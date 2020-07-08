import AppData from '@/app/base/config/AppData';

export default class Client {
    /**
     * 内部构建版本（累增）
     */
    public build: number = AppData.APP_BUILD;
    /**
     * 发布版本号（主版本.功能版本.迭代版本）
     */
    public version: string = AppData.APP_VERSION;
    /**
     * type:客户端类型<br>
     * 1:oim-fx(javafx客户端)<br>
     * 2:oim-e(electron客户端)<br>
     * 3:h5<br>
     * 4:android<br>
     * 5:ios<br>
     */
    public type: string = AppData.APP_TYPE;

    /**
     * platform:客户端平台(系统名称)<br>
     * pc<br>
     * mac<br>
     * linux<br>
     */
    public platform: string = AppData.APP_PLATFORM;
}
