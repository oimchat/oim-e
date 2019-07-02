export default interface DataBackAction {
    /**
     * 收到服务回调
     *
     * @param data
     */
    back(data: any): void;

    /**
     * 发送失败执行
     *
     * @param data
     */
    lost(data: any): void;

    /**
     * 发送超时执行
     *
     * @param data
     */
    timeOut(data: any): void;
}
