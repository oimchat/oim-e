import ContentWrap from '@/common/vue/data/content/ContentWrap';

export default class ContentWrapUtil {

    public static sort(list: ContentWrap[]) {
        if (list) {
            list.sort((a: ContentWrap, b: ContentWrap) => {
                const timestamp1: number = a.getTimestamp();
                const timestamp2: number = b.getTimestamp();
                return timestamp1 - timestamp2;
            });
        }
    }
}
