import WriteMapper from '@/views/component/chat/WriteMapper';

export default interface WriteExtend {
    invoke(writeMapper: WriteMapper): void;
}
