import {MethodMapping} from '@/app/base/action/annotation/ActionDecorator';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import AppContext from '@/app/base/context/AppContext';
import ContactRelationService from '@/app/com/main/module/business/contact/service/ContactRelationService';
import UserService from '@/app/com/main/module/business/user/service/UserService';

export default class UserAction extends AbstractMaterial {
    private static action: string = '1.1.003';

    @MethodMapping(UserAction, UserAction.action, '1.2.0001')
    public update(data: any): void {
        if (data && data.body) {
            const userId: string = data.body.id;
            if (userId) {
                const userService: UserService = this.appContext.getMaterial(UserService);
                userService.updateUserById(userId);
            }
        }
    }

    @MethodMapping(UserAction, UserAction.action, '1.2.0002')
    public updateHead(data: any): void {
        if (data && data.body) {
            const userId: string = data.body.id;
            if (userId) {
                const userService: UserService = this.appContext.getMaterial(UserService);
                userService.updateUserById(userId);
            }
        }
    }

    @MethodMapping(UserAction, UserAction.action, '1.2.0003')
    public updateSignature(data: any): void {
        if (data && data.body) {
            const userId: string = data.body.id;
            if (userId) {
                const userService: UserService = this.appContext.getMaterial(UserService);
                userService.updateUserById(userId);
            }
        }
    }

    @MethodMapping(UserAction, UserAction.action, '1.2.0004')
    public updateStatus(data: any): void {
        if (data && data.body) {
            const userId: string = data.body.id;
            if (userId) {
                const userService: UserService = this.appContext.getMaterial(UserService);
                userService.updateUserById(userId);
            }
        }
    }
}

