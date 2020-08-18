const map: Map<string, any> = new Map<string, any>();
const requireComponents = require.context(
    './', // 在当前目录下查找
    false, // 不遍历子文件夹
    /\.ts$/, // 正则匹配 以 .vue结尾的文件
);
requireComponents.keys().forEach((fileName) => {
    const component = requireComponents(fileName);
    const name = fileName.replace(/^\.\/(.*)\.\w+$/, '$1');
    const v = component.default;
    map.set(name, v);
});
export default map;
