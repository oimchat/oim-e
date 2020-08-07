import BaseChatQuery from '@/app/com/main/module/business/chat/data/BaseChatQuery';

class UserChatQuery extends BaseChatQuery {
    public receiveUserId: string = '';
    public sendUserId: string = '';
}

export default UserChatQuery;
