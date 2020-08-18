const componentData: any = {};
const requireComponent = require.context(
    './', // 在当前目录下查找
    false, // 不遍历子文件夹
    /\.vue$/, // 正则匹配 以 .vue结尾的文件
);
requireComponent.keys().forEach((fileName) => {
    const component = requireComponent(fileName);
    const name = fileName.replace(/^\.\/(.*)\.\w+$/, '$1');
    const v = component.default;
    componentData[name] = v;
});
export default componentData;
