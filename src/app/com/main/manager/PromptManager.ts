import PromptData from '@/app/com/main/data/PromptData';
import AbstractMaterial from '@/app/base/AbstractMaterial';
import ComponentEnum from '@/app/com/main/component/ComponentEnum';
import SoundHandler from '@/app/com/main/component/SoundHandler';

export default class PromptManager extends AbstractMaterial {

    private map: Map<string, PromptData> = new Map<string, PromptData>();

    public playSound(type: number): void {
        const soundHandler: SoundHandler = this.appContext.getObject(ComponentEnum.SoundHandler);
        if (soundHandler) {
            soundHandler.play(type);
        }
    }

    public put(promptKey: string, key: string, type: string, action: (key: string) => void): void {
        const promptData: PromptData = new PromptData();
        this.map.set(promptKey, promptData);
    }

    public remove(promptKey: string): void {
        this.map.delete(promptKey);
    }

    /**
     * 如果提示信息由执行操作，当点击头像或者托盘时，会执行其操作。
     *
     */
    public execute(promptKey: string): void {
        const promptData = this.map.get(promptKey);
        if (promptData) {
            this.map.delete(promptKey);
            if (typeof promptData.action === 'function') {
                promptData.action(promptData.key);
            }
        }
    }

    public getPromptData(promptKey: string): PromptData {
        const promptData: any = this.map.get(promptKey);
        return promptData;
    }

    public getOnePromptData(): PromptData {
        const promptData: any = this.map.values().next();
        return promptData;
    }
}
