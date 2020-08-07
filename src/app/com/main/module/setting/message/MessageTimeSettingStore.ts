import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import MessageTimeSetting from '@/app/com/main/module/setting/message/data/MessageTimeSetting';

class MessageTimeSettingStore extends AbstractMaterial {

    private messagePastTimeFormats: MessagePastTimeFormat[] = [];
    private _messageTimeSetting: MessageTimeSetting = new MessageTimeSetting();

    public setMessagePastTimeFormats(messagePastTimeFormats: MessagePastTimeFormat[]) {
        this.messagePastTimeFormats = messagePastTimeFormats;
    }

    public getPastTimeFormatValue(durationMillisecond: number): string {
        let format = 'yyyy-MM-dd hh:mm:ss';
        const pastTimeFormats: MessagePastTimeFormat[] = this.messagePastTimeFormats;
        if (pastTimeFormats && pastTimeFormats.length > 0) {
            let tempMillisecond = 0;
            for (const v of pastTimeFormats) {
                const millisecond = v.millisecond;
                if (durationMillisecond >= millisecond && millisecond > tempMillisecond) {
                    if (v.format) {
                        format = v.format;
                        tempMillisecond = millisecond;
                    }
                }
            }
        }
        return format;
    }


    get messageTimeSetting(): MessageTimeSetting {
        return this._messageTimeSetting;
    }

    set messageTimeSetting(value: MessageTimeSetting) {
        this._messageTimeSetting = value;
    }
}

export default MessageTimeSettingStore;
