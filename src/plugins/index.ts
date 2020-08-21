const codemirrorPath: string[] = [];
const requireComponents = require.context(
    'codemirror/mode/', // 在当前目录下查找
    true, // 不遍历子文件夹
    /\.js$/, // 正则匹配 以 .vue结尾的文件
);
requireComponents.keys().forEach((fileName) => {
    const component = requireComponents(fileName);
    const name = fileName.replace(/^\.\/(.*)\.\w+$/, '$1');
    const v = component.default;
    const jsPath = 'codemirror/mode/' + name + '.js';
    codemirrorPath.push(jsPath);
    console.log(jsPath);
});
export default codemirrorPath;
