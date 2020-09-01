import AppContext from '@/app/base/context/AppContext';
import FileIconBox from '@/app/com/main/module/support/file/box/FileIconBox';
import FileTypeUtil from '@/app/common/util/FileTypeUtil';

export default class WebPlatformFileIconInitializer {

    public initialize(appContext: AppContext) {
        const unknown = 'default@2x.png';
        const audio = 'audio@2x.png';
        const code = 'code@2x.png';
        const excel = 'excel@2x.png';
        const exe = 'exe@2x.png';
        const folder = 'floder@2x.png';
        const pdf = 'pdf@2x.png';
        const pic = 'pic@2x.png';
        const psd = 'pic_psd@2x.png';
        const ppt = 'ppt@2x.png';
        const text = 'text@2x.png';
        const video = 'video@2x.png';
        const word = 'word@2x.png';
        const zip = 'zip@2x.png';
        const path = 'assets/general/common/images/common/file/';
        const fileIconBox: FileIconBox = appContext.getMaterial(FileIconBox);

        fileIconBox.iconPath = path + unknown;

        fileIconBox.putIcon('java', path + code);
        fileIconBox.putIcon('py', path + code);
        fileIconBox.putIcon('cs', path + code);
        fileIconBox.putIcon('ts', path + code);
        fileIconBox.putIcon('js', path + code);
        fileIconBox.putIcon('html', path + code);
        fileIconBox.putIcon('sql', path + code);

        const imagePath = path + pic;
        for (const n of FileTypeUtil.images) {
            fileIconBox.putIcon(n, imagePath);
        }

        const audioPath = path + audio;
        for (const n of FileTypeUtil.audios) {
            fileIconBox.putIcon(n, audioPath);
        }

        const videoPath = path + video;
        for (const n of FileTypeUtil.videos) {
            fileIconBox.putIcon(n, videoPath);
        }

        fileIconBox.putIcon('exe', path + exe);
        fileIconBox.putIcon('txt', path + text);
        fileIconBox.putIcon('pdf', path + pdf);
        fileIconBox.putIcon('psd', path + psd);

        fileIconBox.putIcon('xls', path + excel);
        fileIconBox.putIcon('xlsx', path + excel);
        fileIconBox.putIcon('doc', path + word);
        fileIconBox.putIcon('docx', path + word);

        fileIconBox.putIcon('ppt', path + ppt);
        fileIconBox.putIcon('pptx', path + ppt);

        fileIconBox.putIcon('zip', path + zip);
        fileIconBox.putIcon('rar', path + zip);
        fileIconBox.putIcon('7z', path + zip);
        fileIconBox.putIcon('tar', path + zip);
        fileIconBox.putIcon('gz', path + zip);
    }
}
