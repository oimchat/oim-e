import DateUtil from '@/app/lib/util/DateUtil';

export default class LaunchOrder {

    public static start(data: any, name: string) {
        LaunchOrder.count++;
        const count = LaunchOrder.count;
        const time = DateUtil.getCurrentDateTimeMilliseconds();
        let dataName = (data) ? data.toString() : '';

        dataName = (data && data.constructor) ? data.constructor.name : dataName;
        const text = count + ':' + time + '/' + dataName + '-' + name;
        console.log(text);
    }

    private static count: number = 0;
}
