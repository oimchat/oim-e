import BaseChatQuery from '@/app/com/main/module/business/chat/data/BaseChatQuery';

class GroupChatQuery extends BaseChatQuery {
    public groupId: string = '';
    public userId: string = '';
    public likeUserNickname: string = '';
}

export default GroupChatQuery;
