export default class BaseChatQuery {
    public text: string = '';
    public type: string = '';
    public startTimestamp: number = 0;
    public endTimestamp: number = 0;
    public messageKeys: string[] = [];
    public contentIds: string[] = [];
}
