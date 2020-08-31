import WriteMapper from '@/views/component/chat/WriteMapper';
import ReadMapper from '@/views/component/chat/ReadMapper';

export default class BaseChatMapper {
    public info: { name: string, text: string, avatar: string } = {name: '', text: '', avatar: ''};
    public readMapper: ReadMapper = new ReadMapper();
    public writeMapper: WriteMapper = new WriteMapper();
}
