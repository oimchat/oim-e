export default class ContactVerifySettingData {
    public userId: string = '';
    /**
     * 1：允许任何人添加 <br>
     * 2：需要验证 <br>
     * 3：需要回答正确的问题 <br>
     * 4：需要回答问题并由我确认 <br>
     */
    public verifyType: string = '2';
    public question: string = '';
}
