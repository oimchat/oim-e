import MessageTimeSettingStore from '@/app/com/main/module/setting/message/MessageTimeSettingStore';
import DateUtil from '@/app/lib/util/DateUtil';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';

export default class ContentCommonHandler extends AbstractMaterial {

    public getTimeText(timestamp: number) {
        let time = '';
        if (timestamp) {

            const messageTimeSettingStore: MessageTimeSettingStore = this.appContext.getMaterial(MessageTimeSettingStore);
            const date = (timestamp) ? new Date(timestamp) : new Date();

            const dateTimestamp = new Date().getTime();
            const durationMillisecond = (dateTimestamp - timestamp);
            const format = messageTimeSettingStore.getPastTimeFormatValue(durationMillisecond);
            time = DateUtil.format(format, date);
        }
        return time;
    }
}
