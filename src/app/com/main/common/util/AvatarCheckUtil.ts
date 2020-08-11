export default class AvatarCheckUtil {

    public static isNetAvatar(avatar: string): boolean {
        let isNet = false;
        if (avatar) {
            isNet = avatar.startsWith('http://') || avatar.startsWith('https://');
        }
        return isNet;
    }
}
