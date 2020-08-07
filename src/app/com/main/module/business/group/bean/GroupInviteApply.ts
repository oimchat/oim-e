export default class GroupInviteApply {

    /*** 0:未处理 **/
    public static VERIFY_HANDLE_TYPE_UNTREATED: string = '0';
    /*** 1:同意 **/
    public static VERIFY_HANDLE_TYPE_ACCEPT: string = '1';
    /*** 2:拒绝 **/
    public static VERIFY_HANDLE_TYPE_REJECT: string = '2';
    /*** 3:忽略 **/
    public static VERIFY_HANDLE_TYPE_IGNORE: string = '3';


    /*** 0:未处理 **/
    public static INVITEE_HANDLE_TYPE_UNTREATED: string = '0';
    /*** 1:同意 **/
    public static INVITEE_HANDLE_TYPE_ACCEPT: string = '1';
    /*** 2:拒绝 **/
    public static INVITEE_HANDLE_TYPE_REJECT: string = '2';
    /*** 3:忽略 **/
    public static INVITEE_HANDLE_TYPE_IGNORE: string = '3';

    public id: string = '';
    /**
     * 受邀请人id
     */
    public inviteeUserId: string = '';
    /**
     * 邀请人id
     */
    public inviterUserId: string = '';
    public inviterUserPosition: string = '';
    public groupId: string = '';
    public verifyType: string = ''; // 当时设定的验证方式

    public inviteeHandleType: string = ''; // 处理结果：0:未处理 1:同意 2:拒绝 3:忽略
    public inviterHandleDateTime: string = ''; // 处理时间

    public verifyHandleType: string = ''; // 处理结果：0:未处理 1:同意 2:拒绝 3:忽略
    public verifyHandleDateTime: string = ''; // 处理时间
    public verifyUserId: string = '';
    public verifyUserPosition: string = '';
    public message: string = ''; // 附加消息

}
