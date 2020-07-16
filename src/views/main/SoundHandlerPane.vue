<template>
    <div style="display:none">
        <audio ref='audioMessage' :src="messageUrl" preload="auto" :type="type"></audio>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import SoundHandler from '@/app/com/main/component/SoundHandler';
    import BaseUtil from '@/app/lib/util/BaseUtil';
    import app from '@/app/App';
    import ComponentEnum from '@/app/com/main/component/ComponentEnum';
    import SoundType from '@/app/com/main/component/SoundType';

    @Component({
        components: {},
    })
    export default class SoundHandlerPane extends Vue implements SoundHandler {
        private timeInterval: number = 0;
        private messageUrl = 'assets/sound/message_general.mp3';
        private type = 'audio/mpeg';
        private map: Map<number, any> = new Map<number, any>();
        private audio = new Audio();

        public mounted() {
            // audio/ogg
            app.appContext.putViewObject(ComponentEnum.SoundHandler, this);
            this.map.set(SoundType.TYPE_SYSTEM, {path: 'assets/sound/message_system.mp3', audioType: 'audio/mpeg'});
            this.map.set(SoundType.TYPE_MESSAGE, {path: 'assets/sound/message_general.mp3', audioType: 'audio/mpeg'});
            this.map.set(SoundType.TYPE_NOTICE, {path: 'assets/sound/message_notify.mp3', audioType: 'audio/mpeg'});
        }

        public play(type: number): void {
            const t = BaseUtil.getTimestamp();
            const temp = t - this.timeInterval;
            if (temp > 3000) {
                const data = this.map.get(type);
                if (data) {
                    this.messageUrl = data.path;
                    this.type = data.audioType;
                }

                this.audio.src = this.messageUrl;
                this.audio.play();

                // const audioMessageName = 'audioMessage';
                // const audioMessage: any = this.$refs[audioMessageName];
                // audioMessage.play();
                // const e: any = document.getElementById('audio-message');
                // if (e) {
                //     e.play();
                // }
                this.timeInterval = BaseUtil.getTimestamp();
            }
        }
    }
</script>

<style scoped>

</style>
