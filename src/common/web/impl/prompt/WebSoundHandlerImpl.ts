import BaseUtil from '@/app/lib/util/BaseUtil';
import SoundType from '@/app/com/client/define/prompt/SoundType';
import SoundHandler from '@/app/com/client/define/prompt/SoundHandler';

export default class WebSoundHandlerImpl implements SoundHandler {
    private timeInterval: number = 0;
    private messageUrl = 'assets/general/common/sound/message_general.mp3';
    private type = 'audio/mpeg';
    private map: Map<number, any> = new Map<number, any>();
    private audio = new Audio();

    public initialize() {
        // audio/ogg
        this.map.set(SoundType.System, {path: 'assets/general/common/sound/message_system.mp3', audioType: 'audio/mpeg'});
        this.map.set(SoundType.Message, {path: 'assets/general/common/sound/message_general.mp3', audioType: 'audio/mpeg'});
        this.map.set(SoundType.Notice, {path: 'assets/general/common/sound/message_notify.mp3', audioType: 'audio/mpeg'});
    }

    public play(type: number): void {
        const t = BaseUtil.getTimestamp();
        const temp = t - this.timeInterval;
        if (temp > 3000) {
            const data = this.map.get(type);
            if (data) {
                this.messageUrl = data.path;
                this.type = data.audioType;
            }

            this.audio.src = this.messageUrl;
            this.audio.play().then((r) => {
                // no
            });
            this.timeInterval = BaseUtil.getTimestamp();
        }
    }
}
