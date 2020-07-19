import AbstractMaterial from '@/app/base/AbstractMaterial';
import MessageAppendType from '@/app/com/main/setting/message/type/MessageAppendType';

class MessageSwitchSetting extends AbstractMaterial {

    private switchType: number = MessageAppendType.last;

    public getSwitchType() {
        return this.switchType;
    }

    public setSwitchType(switchType: number) {
        this.switchType = switchType;
    }
}

export default MessageSwitchSetting;

