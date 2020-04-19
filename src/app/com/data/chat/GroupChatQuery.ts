import BaseChatQuery from '@/app/com/data/chat/BaseChatQuery';

class GroupChatQuery extends BaseChatQuery {
    public groupId: string = '';
    public userId: string = '';
    public likeUserNickname: string = '';
}

export default GroupChatQuery;
