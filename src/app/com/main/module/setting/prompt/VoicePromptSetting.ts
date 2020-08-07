import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import VoicePromptType from '@/app/com/main/module/setting/prompt/type/VoicePromptType';

class VoicePromptSetting extends AbstractMaterial {

    private defaultType: number = VoicePromptType.unread;
    private map: Map<string, number> = new Map<string, number>();

    public getType(key: string): number {
        let type = this.defaultType;
        const map = this.map;
        if (map.has(key)) {
            const t = map.get(key);
            if (t) {
                type = t;
            }
        }
        return type;
    }

    public putType(key: string, type: number) {
        if (key && type) {
            this.map.set(key, type);
        }
    }

    public getDefaultType() {
        return this.defaultType;
    }

    public setDefaultType(defaultType: number) {
        this.defaultType = defaultType;
    }
}

export default VoicePromptSetting;

