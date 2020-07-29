import Material from '@/app/base/context/Material';

export default class MaterialUtil {

    public static instanceOfMaterial(object: any): object is  Material {
        return object.discriminator === 'App-Material';
    }
}
