import {MethodMapping} from '@/app/base/annotation/ActionDecorator';
import AbstractMaterial from '@/app/base/AbstractMaterial';
import AppContext from '@/app/base/AppContext';
import ContactRelationService from '@/app/com/main/service/ContactRelationService';
import UserService from '@/app/com/main/service/UserService';

export default class UserAction extends AbstractMaterial {
    private static action: string = '1.1.002';

    @MethodMapping(UserAction, UserAction.action, '1.2.0001')
    public update(data: any): void {
        if (data && data.body) {
            const userId: string = data.body.userId;
            if (userId) {
                const userService: UserService = this.appContext.getMaterial(UserService);
                userService.updateUserById(userId);
            }
        }
    }

    @MethodMapping(UserAction, UserAction.action, '1.2.0002')
    public updateHead(data: any): void {
        if (data && data.body) {
            const userId: string = data.body.userId;
            if (userId) {
                const userService: UserService = this.appContext.getMaterial(UserService);
                userService.updateUserById(userId);
            }
        }
    }

    @MethodMapping(UserAction, UserAction.action, '1.2.0003')
    public updateSignature(data: any): void {
        if (data && data.body) {
            const userId: string = data.body.userId;
            if (userId) {
                const userService: UserService = this.appContext.getMaterial(UserService);
                userService.updateUserById(userId);
            }
        }
    }

    @MethodMapping(UserAction, UserAction.action, '1.2.0004')
    public updateStatus(data: any): void {
        if (data && data.body) {
            const userId: string = data.body.userId;
            if (userId) {
                const userService: UserService = this.appContext.getMaterial(UserService);
                userService.updateUserById(userId);
            }
        }
    }
}

