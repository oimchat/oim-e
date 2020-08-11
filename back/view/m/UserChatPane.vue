<template>
    <div class="only-full-pane">
        <!--begin HD-->
        <div class="top">
            <div :class="'top-title-warp'">
                <div class="ext">
                    <p class="attr">{{777}}</p>
                </div>
                <div class="avatar">
                    <img :class="'img'" :src="'assets/images/common/head/user/10.png'" alt="">
                </div>

                <div class="info">
                    <h3 class="nickname">
                        <span class="nickname-text">{{chatData.name}}</span>
                    </h3>
                    <p class="msg">
                        <span class="">{{'dddddddddddddddddddd'}}</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="oim-chat-pane">
            <q-splitter
                    v-model="splitterModel"
                    reverse
                    horizontal
                    unit="px"
            >
                <template v-slot:before>
                    <MessagePane :items="model.data.list"></MessagePane>
                </template>
                <template v-slot:after>
                    <WritePane ref="writePane" @on-send="send" @on-key-press='onKeyPress'
                               @on-file="onSendFile"></WritePane>
                </template>
            </q-splitter>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import MessagePane from '@/views/common/chat/ReadPane.vue';
    import WritePane from '@/views/common/chat/WritePane.vue';

    import userChatViewModel from '../../../src/platform/vue/view/model/UserChatViewModel';

    import app from '@/app/App';
    import UserChatController from '@/app/com/main/module/business/chat/controller/UserChatController';
    import ContentUtil from '@/impl/util/ContentUtil';
    import CoreContentUtil from '@/app/com/main/common/util/CoreContentUtil';
    import ContentUploadImageService from '@/app/com/main/module/support/file/service/ContentUploadImageService';
    import UploadResult from '@/app/com/main/module/support/file/data/UploadResult';
    import ImageValue from '@/app/com/common/chat/item/ImageValue';
    import BaseUtil from '@/app/lib/util/BaseUtil';
    import Content from '@/app/com/common/chat/Content';
    import Section from '@/app/com/common/chat/Section';
    import Item from '@/app/com/common/chat/Item';
    import FileValue from '@/app/com/common/chat/item/FileValue';
    import UserChatDataController from '@/app/com/main/module/business/chat/controller/UserChatDataController';
    import ImageItemFileConverter from '@/app/define/file/ImageItemFileConverter';

    @Component({
        components: {
            MessagePane,
            WritePane,
        },
    })
    export default class UserChatPane extends Vue {
        private splitterModel = 190; // start at 150px
        private model = userChatViewModel;
        private chatData = userChatViewModel.chatData;
        private messageInfo = userChatViewModel.data;
        private cacheData = userChatViewModel.cacheData;
        private selectionStart: number = 0;


        public mounted() {
            this.initialize();

            userChatViewModel.cacheData.updateScroll = (size: number) => {
                const messageListPaneName = 'messageListPane';
                const messageListPane: any = this.$refs[messageListPaneName];
                if (messageListPane) {
                    messageListPane.scrollTop = size;
                }
            };

            userChatViewModel.cacheData.getScrollHeight = () => {
                const messageListPaneName = 'messageListPane';
                const messageListPane: any = this.$refs[messageListPaneName];
                const height = (messageListPane) ? messageListPane.scrollHeight : 0;
                return height;
            };

            userChatViewModel.cacheData.setInnerHTML = (html: string) => {
                const writePaneName = 'writePane';
                const writePane: any = this.$refs[writePaneName];
                if (writePane) {
                    writePane.setInnerHTML(html);
                }
            };
            userChatViewModel.cacheData.updateScrollIntoView = (viewId: string) => {
                // no
                const messageListPaneName = 'messageListPane';
                const messageListPane: any = this.$refs[messageListPaneName];
                // const height = messageListPane.scrollHeight;
                const v = document.getElementById(viewId);
                if (v && messageListPane) {
                    const offsetTop = v.offsetTop;
                    messageListPane.scrollTop = offsetTop;
                }
            };
        }

        private initialize() {
            const own = this;
            // todo
            const messageListPaneName = 'messageListPane';
            const messageListPane = this.$refs[messageListPaneName];
            if (messageListPane instanceof Element) {
                const messageListElement = messageListPane as Element;
                messageListElement.addEventListener('mousewheel', (e: Event) => {
                    if (e instanceof WheelEvent) {
                        const ev: WheelEvent = e as WheelEvent;

                        const deltaY = e.deltaY;

                        if (deltaY < 0) {
                            // 向上
                            const target = messageListElement;
                            const node = target as Element;
                            const height = node.scrollHeight;
                            const top = node.scrollTop;

                            const clientHeight = node.clientHeight;
                            let position = '';
                            const a = (height - top);
                            const b = (clientHeight + 25);

                            if (height === clientHeight) {
                                // 滚动条没有出来
                                if (top === 0) {
                                    position = 'top';
                                    own.cacheData.data.scrollTopCount++;
                                    if (own.cacheData.data.scrollTopCount > 3) {
                                        own.loadHistory();
                                        own.cacheData.data.scrollTopCount = 0;
                                    }
                                }
                            } else {
                                if (a < b) {
                                    position = 'bottom';
                                } else if (top === 0) {
                                    position = 'top';
                                    own.cacheData.data.scrollTopCount++;
                                    if (own.cacheData.data.scrollTopCount > 3) {
                                        own.loadHistory();
                                        own.cacheData.data.scrollTopCount = 0;
                                    }
                                } else {
                                    position = 'middle';
                                }
                            }
                        }
                    }
                });
            }
        }

        private onKeyPress(e: Event, inputArea: any) {
            this.cacheData.data.html = (inputArea as Element).innerHTML;
        }

        private send(inputArea: any) {
            const childNodes: Element[] = inputArea.childNodes;
            if (childNodes) {
                const userId = this.chatData.key;
                const content = ContentUtil.getContent(childNodes);
                if (content) {
                    const text = CoreContentUtil.getText(content);
                    const itemSize = CoreContentUtil.getItemSize(content);
                    if (text.length > 10000 || itemSize > 1000) {
                        this.$Notice.warning({
                            title: '警告',
                            desc: '内容过长！',
                        });
                    }
                    if (itemSize === 0) {
                        inputArea.innerHTML = '';
                        this.cacheData.data.html = '';
                    } else {
                        const items = CoreContentUtil.getImageItemList(content);
                        try {
                            // const map: Map<string, File> = (wuh) ? wuh.getFileMapByItems(items) : new Map<string, File>(); // ImagePathFile.getFileMapByItems(items);

                            const handleItemsBack = (map: Map<string, File>) => {
                                if (map.size > 0) {
                                    const cuis: ContentUploadImageService = app.appContext.getMaterial(ContentUploadImageService);
                                    cuis.uploadImages(map, (success: boolean, rm: Map<string, UploadResult>, message?: string) => {
                                        if (success) {
                                            for (const item of items) {
                                                const iv: ImageValue = BaseUtil.jsonToObject(item.value);
                                                if (iv) {
                                                    const key = iv.url;
                                                    const ur = rm.get(key);
                                                    if (ur && ur.result && ur.result.body) {
                                                        const data = ur.result.body;
                                                        const id = data.id;
                                                        const name = data.name;
                                                        const size = data.size;
                                                        const url = data.url;
                                                        iv.id = id;
                                                        iv.name = name;
                                                        iv.size = size;
                                                        iv.url = url;

                                                        item.value = BaseUtil.objectToJson(iv);
                                                    }
                                                }
                                            }

                                            const userChatController: UserChatController = app.appContext.getMaterial(UserChatController);
                                            userChatController.userChat(userId, content);
                                            inputArea.innerHTML = '';
                                            this.cacheData.data.html = '';
                                        }
                                    });
                                } else {
                                    const userChatController: UserChatController = app.appContext.getMaterial(UserChatController);
                                    userChatController.userChat(userId, content);
                                    inputArea.innerHTML = '';
                                    this.cacheData.data.html = '';
                                }
                            };

                            const wuh: ImageItemFileConverter = app.appContext.getObject(ImageItemFileConverter.name);
                            if (wuh) {
                                wuh.handleItems(items, handleItemsBack);
                            } else {
                                handleItemsBack(new Map<string, File>());
                            }
                        } catch (e) {
                            this.$Notice.warning({
                                title: '警告',
                                desc: '图片无法发送！',
                            });
                        }
                    }
                }
            }
        }

        private onSendFile(result: any, file: File) {

            if (result && result.body) {

                const content: Content = new Content();
                const section: Section = new Section();
                content.sections.push(section);


                const item: Item = new Item();
                item.type = Item.TYPE_FILE;


                const data = result.body;
                const id = data.id;
                const name = data.name;
                const size = data.size;
                const url = data.url;
                const iv: FileValue = new FileValue();
                iv.id = id;
                iv.name = name;
                iv.size = size;
                iv.url = url;

                item.value = BaseUtil.objectToJson(iv);
                section.items.push(item);

                const userId = this.chatData.key;
                const userChatController: UserChatController = app.appContext.getMaterial(UserChatController);
                userChatController.userChat(userId, content);
            }
        }

        private handleScroll(e: Event) {
            const own = this;
            const target = e.target;
            if (target instanceof Element) {
                const node = target as Element;
                const height = node.scrollHeight;
                const top = node.scrollTop;

                const clientHeight = node.clientHeight;
                let position = '';

                const a = (height - top);
                const b = (clientHeight + 25);

                if (a < b) {
                    position = 'bottom';
                } else if (top === 0) {
                    position = 'top';
                } else {
                    position = 'middle';
                }
                own.cacheData.data.scrollHeight = height;
                own.cacheData.data.scrollTop = top;
                own.cacheData.data.scrollPosition = position;
            }
        }

        @Watch('messageInfo.list')
        private listChange(): void {
            // no
        }

        private loadHistory() {
            userChatViewModel.loadHistory();
        }
    }
</script>

<style lang="scss" scoped>
    .top {
        padding-top: 10px;
        background-color: #fff;
        color: #000000;
        height: 65px;
        border-bottom: 1px solid #d2d2d2;
    }

    .title-wrap {
        position: relative;
        margin: 0 19px;
        z-index: 1024;
    }

    .title {
        font-weight: 400;
        height: 25px;
        display: inline-block;
        font-size: 18px
    }

    .avatar-wrap {
        float: left;
        position: relative;
        padding: 2px 0px 0px 10px;
    }

    .avatar {
        float: left;
        margin-right: 10px;
        position: relative
    }

    .avatar .img {
        display: block;
        width: 40px;
        height: 40px;
        /*border-radius: 2px;*/
        /*-moz-border-radius: 2px;*/
        /*-webkit-border-radius: 2px*/
        border-radius: 50%;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
    }

    .top-extend {
        float: right;
    }


    .top-title-warp {
        overflow: hidden;
        padding: 6px 18px 11px;
        /*border-bottom: 1px solid #647481;*/
        position: relative
    }

    .top-title-warp.top {
        background-color: #2e3641
    }

    .top-title-warp.active {
        background: #cbced0
    }

    .top-title-warp.active .ext, .top-title-warp.active .info .msg {
        color: #181818
    }

    .top-title-warp .avatar {
        float: left;
        margin-right: 10px;
        position: relative;
        cursor: pointer;
    }

    .top-title-warp .avatar .img {
        display: block;
        width: 40px;
        height: 40px;
        /*border-radius: 2px;*/
        /*-moz-border-radius: 2px;*/
        /*-webkit-border-radius: 2px*/
        border-radius: 50%;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
    }

    .top-title-warp .avatar .icon {
        position: absolute;
        top: -6px;
        right: -6px;
        color: #fff;
        font-style: normal;
        font-size: 12px;
        text-align: center
    }

    .top-title-warp .info {
        overflow: hidden
    }

    .top-title-warp .info .nickname {
        font-weight: 400;
        font-size: 13px;
        color: #0a0a0a;
        line-height: 20px
    }

    .top-title-warp .info .nickname-text {
        width: 100%;
        font-size: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal
    }

    .top-title-warp .info .nickname_count, .top-title-warp .info .nickname-text {
        display: inline-block;
        *display: inline;
        *zoom: 1;
        vertical-align: top
    }

    .top-title-warp .info .msg {
        color: #989898;
        font-size: 13px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        height: 1.5em
    }

    .top-title-warp .ext {
        float: right;
        color: #6b6f7c;
        font-size: 13px;
        text-align: right
    }

    .top-title-warp .ext .attr {
        height: 19px;
        line-height: 1.5
    }


</style>
