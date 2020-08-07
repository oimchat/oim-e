export default class ContactHarassSetting {
    /*** 1：允许任何人添加 **/
    public static VERIFY_TYPE_ANY: string = '1';
    /*** 2：需要验证 **/
    public static VERIFY_TYPE_AUTH: string = '2';
    /*** 3：需要回答正确的问题 **/
    public static VERIFY_TYPE_ANSWER: string = '3';
    /*** 4：需要回答问题并由我确认 **/
    public static VERIFY_TYPE_CONFIRM: string = '4';

    public userId: string = '';
    /**
     * 1：允许任何人添加 <br>
     * 2：需要验证 <br>
     * 3：需要回答正确的问题 <br>
     * 4：需要回答问题并由我确认 <br>
     */
    public verifyType: string = '2';
    public question: string = '';
    public answer: string = '';
}
