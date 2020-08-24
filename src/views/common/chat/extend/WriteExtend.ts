import WriteMapper from '@/views/common/chat/WriteMapper';

export default interface WriteExtend {
    invoke(writeMapper: WriteMapper): void;
}
