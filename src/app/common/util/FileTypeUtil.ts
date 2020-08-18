export default class FileTypeUtil {
    public static videos: string[] = [
        'wmv', 'avi', 'dat', 'asf', 'mpeg', 'mpg',
        'rm', 'rmvb', 'ram', 'flv', 'mp4', '3gp',
        'mov', 'divx', 'dv', 'vob', 'mkv', 'qt',
        'cpk', 'fli', 'flc', 'f4v', 'm4v', 'mod',
        'm2t', 'swf', 'webm', 'mts', 'm2ts', '3g2',
        'mpe', 'ts', 'div', 'lavf', 'dirac',
    ];
    public static audios: string[] = [
        'mp3', 'wma', 'wav', 'wax', 'au', 'snd', 'raw', 'alc', 'flac', 'aac',
        'amr', 'm4a', 'm4r', 'm4v', 'voc', 'vox', 'aif', 'aiff', 'dwd', 'ogg',
        'vobis', 'wavpack', 'mp2', 'ape', 'ac3', 'midi', 'mid', 'vqf', 'cd', 'cda',
        'md', 's3u', 'dsp', 'cmf', 'mod', 'mpc', 'mpeg', 'mpeg1', 'mpeg2', 'mpeg3',
        'mpeg4', 'ra', 'rm', 'rmx', 'pcm', 'swk', 'realmedia', 'alaw', 'ari', 'esps',
        'mus', 'nist', 'nwc', 'psi', 'rmi', 'sd', 'sf', 'sndr', 'sndt', 'syw',
        'swa', 'txw', 'ulaw', 'v8', 'vmf', 'bwv', 'c01', 'o01', 'm3u', 'cap',
        'dls', 'iff', 'cel', 'smp', 'svx', 'dbl', 'sam',
    ];

    public static images: string[] = [
        'bmp', 'jpg', 'jpeg', 'png', 'tif',
        'gif', 'pcx', 'tga', 'exif',
        'fpx', 'svg', 'psd', 'cdr',
        'pcd', 'dxf', 'ufo', 'eps',
        'ai', 'raw', 'wmf', 'webp'];

    public static has(name: string, names: string[]) {
        let is = false;
        if (typeof name === 'string' && name) {
            const fileName = name.toLowerCase();
            for (const e of names) {
                if (fileName.endsWith('.' + e)) {
                    is = true;
                    break;
                }
            }
        }
        return is;
    }

    public static isVideoByName(name: string): boolean {
        const is = FileTypeUtil.has(name, FileTypeUtil.videos);
        return is;
    }

    public static isAudioByName(name: string): boolean {
        const is = FileTypeUtil.has(name, FileTypeUtil.audios);
        return is;
    }

    public static isImageByName(name: string): boolean {
        const is = FileTypeUtil.has(name, FileTypeUtil.images);
        return is;
    }
}
