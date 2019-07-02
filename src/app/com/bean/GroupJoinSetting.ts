export default class GroupJoinSetting {
    /*** 1：.允许任何人加入 **/
    public static JOIN_VERIFY_TYPE_ANY: string = '1';
    /*** 2：需要验证消息 **/
    public static JOIN_VERIFY_TYPE_AUTH: string = '2';
    /*** 3：需要回答正确问题 **/
    public static JOIN_VERIFY_TYPE_ANSWER: string = '3';
    /*** 4：需要回答问题并由管理员审核 **/
    public static JOIN_VERIFY_TYPE_CONFIRM: string = '4';
    /*** 5：只允许邀请加入 **/
    public static JOIN_VERIFY_TYPE_INVITE: string = '5';
    /*** 6：不允许任何人加入 **/
    public static JOIN_VERIFY_TYPE_NEVER: string = '6';

    /*** 1：.不允许邀请 **/
    public static INVITE_TYPE_NEVER: string = '1';
    /*** 2：管理员邀请加入 **/
    public static INVITE_TYPE_ADMIN: string = '2';
    /*** 3：允许任何人邀请加入 **/
    public static INVITE_TYPE_ANY: string = '3';
    /*** 4：需要管理员验证 **/
    public static INVITE_TYPE_AUTH: string = '4';

    public groupId: string = '';

    /**
     * 申请加群方式<br>
     * 1.允许任何人加入<br>
     * 2.需要验证消息<br>
     * 3.需要回答正确问题<br>
     * 4.需要回答问题并由管理员审核<br>
     * 5.只允许邀请加入<br>
     * 6.不允许任何人加入<br>
     */
    public joinType: string = '';
    /**
     * 邀请加群方式<br>
     * 1.不允许邀请<br>
     * 2.管理员邀请加入<br>
     * 3.允许任何人邀请加入<br>
     * 4.需要管理员验证<br>
     */

    public inviteType: string = '';
    public question: string = '';
    public answer: string = '';
}
