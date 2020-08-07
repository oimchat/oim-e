import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import MessageDisplaySetting from '@/app/com/main/module/setting/message/data/MessageDisplaySetting';

class MessageDisplaySettingStore extends AbstractMaterial {

    private defaultSetting: MessageDisplaySetting = new MessageDisplaySetting();
    private map: Map<string, MessageDisplaySetting> = new Map<string, MessageDisplaySetting>();

    public getSetting(key: string): MessageDisplaySetting {
        let setting = this.defaultSetting;
        const map = this.map;
        if (map.has(key)) {
            const t = map.get(key);
            if (t) {
                setting = t;
            }
        }
        return setting;
    }

    public putSetting(key: string, setting: MessageDisplaySetting) {
        if (key && setting) {
            this.map.set(key, setting);
        }
    }

    public getDefaultSetting() {
        return this.defaultSetting;
    }

    public setDefaultSetting(defaultType: MessageDisplaySetting) {
        this.defaultSetting = defaultType;
    }
}

export default MessageDisplaySettingStore;

