import WriteMapper from '@/views/common/chat/WriteMapper';
import ReadMapper from '@/views/common/chat/ReadMapper';

export default class BaseChatMapper {
    public info: { name: string, text: string, avatar: string } = {name: '', text: '', avatar: ''};
    public readMapper: ReadMapper = new ReadMapper();
    public writeMapper: WriteMapper = new WriteMapper();
}
