export default class RecentChat {

    public static TYPE_USER: string = '1'; // 联系人
    public static TYPE_GROUP: string = '2'; // 群
    public static TYPE_TEAM: string = '3'; // 讨论组
    public static TYPE_ROOM: string = '4'; // 聊天室
    public static TYPE_MEETING: string = '5'; // 会议

    public userId: string = '';
    public messageKey: string = '';
    public contentId: string = '';
    public chatId: string = '';
    public type: string = '';
    public timestamp: number = 0;
}
