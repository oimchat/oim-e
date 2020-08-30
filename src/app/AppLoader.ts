import 'reflect-metadata';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';

export default class AppLoader {
    private map: Map<string, any> = new Map<string, any>();

    public constructor() {
        // no
    }

    public load(): void {
        const own = this;
        const requireContext = require.context(
            './', // 在当前目录下查找
            true, // 不遍历子文件夹
            /\.ts$/, // 正则匹配 以 .ts结尾的文件
        );
        requireContext.keys().forEach((fileName) => {
            const component = requireContext(fileName);
            const name = fileName.replace(/^\.\/(.*)\.\w+$/, '$1');
            const v = component.default;
            //  console.log(name + ':' + v);


            own.map.set(fileName, component);
            console.log(typeof v);
            if (v instanceof AbstractMaterial) {
                const fo: Function = v as unknown as Function;
                if (fo) {

                }
                console.log('instanceof:');
                console.log(typeof v);
            }
        });
        // console.log(own.map);
    }
}
