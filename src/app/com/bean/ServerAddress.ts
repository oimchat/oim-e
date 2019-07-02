export default class ServerAddress {
    public serverTypeId: string = '';
    /**
     *
     * IPv4<br>
     * IPv6 <br>
     * Domain<br>
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
    public isEnabled: string = '0';
}
