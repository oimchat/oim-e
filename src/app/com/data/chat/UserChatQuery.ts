import BaseChatQuery from '@/app/com/data/chat/BaseChatQuery';

class UserChatQuery extends BaseChatQuery {
    public receiveUserId: string = '';
    public sendUserId: string = '';
}

export default UserChatQuery;
