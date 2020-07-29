import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import User from '@/app/com/bean/User';
import ViewEnum from '@/app/com/main/view/ViewEnum';
import Content from '@/app/com/data/chat/content/Content';
import UserChatView from '@/app/com/main/view/UserChatView';

export default abstract class ChatBaseManager extends AbstractMaterial {

    protected loadMap: Map<string, boolean> = new Map<string, boolean>();

}
