export default class ServerAddress {
    public serverTypeCode: string = '';
    /**
     *
     * IPv4<br>
     * IPv6 <br>
     * URL<br>
     *
     */
    public addressType: string = '';

    /**
     * TCP<br>
     * UDP<br>
     * FTP<br>
     * HTTP
     */
    public protocol: string = '';
    public address: string = '';
    public port: number = 0;

    /**
     * 是否启用：0：否、1：是
     */
    public enabled: boolean = true;
}
