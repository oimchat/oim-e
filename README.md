<p align="center">
    <img width="150" src="./build/icons/icon_128x128.png">
</p>

<h1 align="center">OIM-E</h1>

# 简介
OIM-E是基于Electron实现的PC桌面聊天软件，可支持Windows、Linux、Mac等主流平台。
主要采用了Vue、iView、TypeScript等技术实现，通讯协议主要是websocket。服务端支持私有部署，可用于企业内部管理通讯等功能。

## 主要功能
* 个人资料<br>
  资料修改<br>
  自定义头像
* 联系人<br>
    联系人分组<br>
    联系人备注名<br>
    联系人管理<br>
* 群<br>
    群分组<br>
    群管理<br>
* 聊天<br>
    私聊<br>
    群聊<br>
    支持 图片、表情、文件、图文混排
    
## 截图
<img src="./screenshot/1.png">
<img src="./screenshot/2.png">
<img src="./screenshot/3.png">
<img src="./screenshot/4.png">
<img src="./screenshot/5.png">
<img src="./screenshot/6.png">

## 命令

```
初次下载源码后进行安装依赖
npm install

开发调试
npm run dev

打包构建（分别在不同平台打不同的包）
npm run electron:build
```
