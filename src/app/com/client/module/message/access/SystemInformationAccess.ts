import AbstractMaterial from '@/app/base/context/AbstractMaterial';

export default class SystemInformationService extends AbstractMaterial {

    public inform(type: string,
                  text: string,
                  value: any,
                  onSelect: (key: any, value: any) => void,
                  onDelete: (key: string, value: any) => void,
                  prompt: boolean,
                  count: number) {

        const systemInformationService: SystemInformationService = this.appContext.getMaterial(SystemInformationService);
        systemInformationService.inform(type, text, value, onSelect, onDelete, prompt, count);
    }

    public showByType(type: string) {

        const systemInformationService: SystemInformationService = this.appContext.getMaterial(SystemInformationService);
        systemInformationService.showByType(type);
    }

    public delete(key: string): void {
        const systemInformationService: SystemInformationService = this.appContext.getMaterial(SystemInformationService);
        systemInformationService.delete(key);
    }
}
