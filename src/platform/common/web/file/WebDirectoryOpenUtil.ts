export default class WebDirectoryOpenUtil {
    /**
     * 按钮事件实现函数
     * 原理：利用input标签的file类别，打开选择文件对话框
     * 通过change事件，将选择的文件返回。为了使每次选择的文件都得到更新，
     * 在input对象用完后每次都移除出html中，下次使用时再重新创建并添加到html中
     */
    public static openFolder(directory?: string) {

        // 创建input标签
        const inputElement = document.createElement('input');

        // 设置属性
        inputElement.setAttribute('type', 'file');
        inputElement.setAttribute('style', 'visibility:hidden');
        inputElement.setAttribute('directory', '');
        inputElement.setAttribute('webkitdirectory', '');
        if (directory) { // 如果要选择路径，则添加以下两个属性
            // no
        }

        // 添加到DOM中
        // document.body.appendChild(inputElement);
        // 添加事件监听器

        inputElement.addEventListener('change', () => {
            // var inputElement = document.getElementById("_ef");
            const files = inputElement.files;
            if (files && files.length > 1) {
                const file = files[0];
                // const path = file.path;
                const name = file.name;
                // console.log(path);

                // alert('当前仅支持选择一个文件');
            } else {
                // no
            }
            // console.log(files);
            // 移除事件监听器
            inputElement.removeEventListener('change', () => {
                // no
            });

            // 从DOM中移除input
            // document.body.removeChild(inputElement);
        });
        // 模拟点击
        inputElement.click();
    }
}
