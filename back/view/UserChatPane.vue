<template>
    <div class="box chat">
        <!--begin HD-->
        <div class="box_hd">
            <div></div>
            <div class="title_wrap">
                <div class="title poi">
                    <a class="title_name ng-binding" data-username="">{{chatData.name}}</a>
                    <i class="oim_chat_down_icon "></i>
                </div>
            </div>
        </div>

        <q-splitter
                v-model="150"
                horizontal
                style="height: 400px"
        >

            <template v-slot:before>
                <div class="q-pa-md">
                    <div class="text-h4 q-mb-md">Before</div>
                    <div v-for="n in 20" :key="n" class="q-my-md">{{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</div>
                </div>
            </template>

            <template v-slot:after>
                <div class="q-pa-md">
                    <div class="text-h4 q-mb-md">After</div>
                    <div v-for="n in 20" :key="n" class="q-my-md">{{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</div>
                </div>
            </template>

        </q-splitter>

        <!--end HD-->
        <!--begin BD-->
        <div ref="messageListPane" @scroll="handleScroll" class="scroll-wrapper box_bd chat_bd scrollbar-dynamic"
             style="position: absolute;">
            <MessagePane :items="model.messageInfo.list"></MessagePane>
        </div>
        <div v-if='model.messageInfo.showPrompt' class="popup members_wrp slide-down" tabindex="-1" style="">
            <div class="members compatible">
                <div class="members_inner">
                    {{model.messageInfo.prompt}}
                </div>
            </div>
        </div>
        <WritePane ref="writePane" @on-send="send" @on-key-press='onKeyPress' @on-file="onSendFile"></WritePane>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import MessagePane from '@/views/common/chat/ReadPane.vue';
    import WritePane from '@/views/common/chat/WritePane.vue';

    import userChatViewModel from '../../src/platform/vue/view/model/UserChatViewModel';

    import app from '@/app/App';
    import UserChatController from '@/app/com/main/module/business/chat/controller/UserChatController';
    import ContentUtil from '@/impl/util/ContentUtil';
    import CoreContentUtil from '../../src/app/com/common/chat/util/CoreContentUtil';
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

        private model = userChatViewModel;
        private chatData = userChatViewModel.info;
        private messageInfo = userChatViewModel.messageInfo;
        private cacheData = userChatViewModel.viewData;
        private selectionStart: number = 0;


        public mounted() {
            this.initialize();

            userChatViewModel.viewData.updateScroll = (size: number) => {
                const messageListPaneName = 'messageListPane';
                const messageListPane: any = this.$refs[messageListPaneName];
                if (messageListPane) {
                    messageListPane.scrollTop = size;
                }
            };

            userChatViewModel.viewData.getScrollHeight = () => {
                const messageListPaneName = 'messageListPane';
                const messageListPane: any = this.$refs[messageListPaneName];
                const height = (messageListPane) ? messageListPane.scrollHeight : 0;
                return height;
            };

            userChatViewModel.viewData.setInnerHTML = (html: string) => {
                const writePaneName = 'writePane';
                const writePane: any = this.$refs[writePaneName];
                if (writePane) {
                    writePane.setInnerHTML(html);
                }
            };
            userChatViewModel.viewData.updateScrollIntoView = (viewId: string) => {
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
                                            userChatController.chat(userId, content);
                                            inputArea.innerHTML = '';
                                            this.cacheData.data.html = '';
                                        }
                                    });
                                } else {
                                    const userChatController: UserChatController = app.appContext.getMaterial(UserChatController);
                                    userChatController.chat(userId, content);
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
                userChatController.chat(userId, content);
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

<style scoped>

</style>
