import FaceValue from '@/app/com/data/chat/content/item/FaceValue';
import AbstractMaterial from '@/app/base/context/AbstractMaterial';
import AppContext from '@/app/base/context/AppContext';

export default class FaceBox extends AbstractMaterial {
    private map: Map<string, Map<string, FaceValue>> = new Map<string, Map<string, FaceValue>>();

    constructor(protected appContext: AppContext) {
        super(appContext);
        this.init();
    }

    public put(face: string) {
        if (face) {
            const array = face.split(',');
            if (array && array.length > 1) {
                const categoryId = array[0];
                const key = array[1];
                const text = (array.length > 2) ? array[2] : '';
                const faceValue: FaceValue = new FaceValue();
                faceValue.categoryId = categoryId;
                faceValue.key = key;
                faceValue.text = text;
                this.add(faceValue);
            }
        }
    }

    public add(faceValue: FaceValue) {
        const categoryId = faceValue.categoryId;
        const key = faceValue.key;
        const map = this.getOrCreateMap(categoryId);
        map.set(key, faceValue);
    }

    public getMap(categoryId: string): Map<string, FaceValue> {
        const map: any = this.map.get(categoryId);
        return map;
    }

    public getList(categoryId: string): FaceValue[] {
        const map = this.map.get(categoryId);
        const list: FaceValue[] = [];
        if (map) {
            const allList = map.values();
            for (const ud of allList) {
                list.push(ud);
            }
        }
        return list;
    }

    public getOrCreateMap(categoryId: string): Map<string, FaceValue> {
        let map = this.map.get(categoryId);
        if (!map) {
            map = new Map<string, FaceValue>();
            this.map.set(categoryId, map);
        }
        return map;
    }

    private init() {
        this.put('classical,0,惊讶');
        this.put('classical,1,撇嘴');
        this.put('classical,2,色');
        this.put('classical,3,发呆');
        this.put('classical,4,得意');
        this.put('classical,5,流泪');
        this.put('classical,6,害羞');
        this.put('classical,7,闭嘴');
        this.put('classical,8,睡');
        this.put('classical,9,大哭');
        this.put('classical,10,尴尬');
        this.put('classical,11,发怒');
        this.put('classical,12,调皮');
        this.put('classical,13,呲牙');
        this.put('classical,14,微笑');
        this.put('classical,15,难过');
        this.put('classical,16,酷');
        this.put('classical,17,非典');
        this.put('classical,18,抓狂');
        this.put('classical,19,吐');
        this.put('classical,20,偷笑');
        this.put('classical,21,可爱');
        this.put('classical,22,白眼');
        this.put('classical,23,傲慢');
        this.put('classical,24,饥饿');
        this.put('classical,25,困');
        this.put('classical,26,惊恐');
        this.put('classical,27,流汗');
        this.put('classical,28,憨笑');
        this.put('classical,29,大兵');
        this.put('classical,30,奋斗');
        this.put('classical,31,咒骂');
        this.put('classical,32,疑问');
        this.put('classical,33,嘘...');
        this.put('classical,34,晕');
        this.put('classical,35,折磨');
        this.put('classical,36,衰');
        this.put('classical,37,骷髅');
        this.put('classical,38,敲打');
        this.put('classical,39,再见');
        this.put('classical,40,闪人');
        this.put('classical,41,发抖');
        this.put('classical,42,爱情');
        this.put('classical,43,跳跳');
        this.put('classical,44,找');
        this.put('classical,45,美眉');
        this.put('classical,46,猪头');
        this.put('classical,47,猫咪');
        this.put('classical,48,小狗');
        this.put('classical,49,拥抱');
        this.put('classical,50,人民币');
        this.put('classical,51,灯泡');
        this.put('classical,52,酒杯');
        this.put('classical,53,蛋糕');
        this.put('classical,54,闪电');
        this.put('classical,55,炸弹');
        this.put('classical,56,刀');
        this.put('classical,57,足球');
        this.put('classical,58,音乐');
        this.put('classical,59,便便');
        this.put('classical,60,咖啡');
        this.put('classical,61,饭');
        this.put('classical,62,药丸');
        this.put('classical,63,玫瑰');
        this.put('classical,64,凋谢');
        this.put('classical,65,示爱');
        this.put('classical,66,爱心');
        this.put('classical,67,心碎');
        this.put('classical,68,会议');
        this.put('classical,69,礼物');
        this.put('classical,70,电话');
        this.put('classical,71,时间');
        this.put('classical,72,邮件');
        this.put('classical,73,电视');
        this.put('classical,74,太阳');
        this.put('classical,75,月亮');
        this.put('classical,76,强');
        this.put('classical,77,弱');
        this.put('classical,78,握手');
        this.put('classical,79,胜利');
        this.put('classical,80,多多');
        this.put('classical,81,美女');
        this.put('classical,82,汉良');
        this.put('classical,83,毛毛');
        this.put('classical,84,Q仔');
        this.put('classical,85,飞吻');
        this.put('classical,86,怄火');
        this.put('classical,87,白酒');
        this.put('classical,88,汽水');
        this.put('classical,89,西瓜');
        this.put('classical,90,下雨');
        this.put('classical,91,多云');
        this.put('classical,92,雪人');
        this.put('classical,93,星星');
        this.put('classical,94,女');
        this.put('classical,95,男');
        this.put('classical,96,冷汗');
        this.put('classical,97,擦汗');
        this.put('classical,98,抠鼻');
        this.put('classical,99,鼓掌');
        this.put('classical,100,糗大了');
        this.put('classical,101,坏笑');
        this.put('classical,102,左哼哼');
        this.put('classical,103,右哼哼');
        this.put('classical,104,哈欠');
        this.put('classical,105,鄙视');
        this.put('classical,106,委屈');
        this.put('classical,107,快哭了');
        this.put('classical,108,阴险');
        this.put('classical,109,亲亲');
        this.put('classical,110,吓');
        this.put('classical,111,可怜');
        this.put('classical,112,菜刀');
        this.put('classical,113,啤酒');
        this.put('classical,114,篮球');
        this.put('classical,115,乒乓');
        this.put('classical,116,示爱');
        this.put('classical,117,瓢虫');
        this.put('classical,118,抱拳');
        this.put('classical,119,勾引');
        this.put('classical,120,拳头');
        this.put('classical,121,差劲');
        this.put('classical,122,爱你');
        this.put('classical,123,NO');
        this.put('classical,124,OK');
        this.put('classical,125,转圈');
        this.put('classical,126,磕头');
        this.put('classical,127,回头');
        this.put('classical,128,跳绳');
        this.put('classical,129,挥手');
        this.put('classical,130,激动');
        this.put('classical,131,街舞');
        this.put('classical,132,献吻');
        this.put('classical,133,左太极');
        this.put('classical,134,右太极');
        this.put('classical,135,招财进宝');
        this.put('classical,136,双喜');
        this.put('classical,137,鞭炮');
        this.put('classical,138,灯笼');
        this.put('classical,139,发财');
        this.put('classical,140,K歌');
        this.put('classical,141,购物');
        this.put('classical,142,邮件');
        this.put('classical,143,帅');
        this.put('classical,144,喝彩');
        this.put('classical,145,祈祷');
        this.put('classical,146,爆筋');
        this.put('classical,147,棒棒糖');
        this.put('classical,148,喝奶');
        this.put('classical,149,下面');
        this.put('classical,150,香蕉');
        this.put('classical,151,飞机');
        this.put('classical,152,开车');
        this.put('classical,153,高铁左车头');
        this.put('classical,154,车厢');
        this.put('classical,155,高铁右车头');
        this.put('classical,156,多云');
        this.put('classical,157,下雨');
        this.put('classical,158,钞票');
        this.put('classical,159,熊猫');
        this.put('classical,160,灯泡');
        this.put('classical,161,风车');
        this.put('classical,162,闹钟');
        this.put('classical,163,打伞');
        this.put('classical,164,彩球');
        this.put('classical,165,钻戒');
        this.put('classical,166,沙发');
        this.put('classical,167,纸巾');
        this.put('classical,168,药');
        this.put('classical,169,手枪');
        this.put('classical,170,青蛙');
        this.put('classical,171,茶');
        this.put('classical,172,眨眼睛');
        this.put('classical,173,泪奔');
        this.put('classical,174,无奈');
        this.put('classical,175,卖萌');
        this.put('classical,176,小纠结');
        this.put('classical,177,喷血');
        this.put('classical,178,斜眼笑');
        this.put('classical,179,doge');
        this.put('classical,180,惊喜');
        this.put('classical,181,骚扰');
        this.put('classical,182,笑哭');
        this.put('classical,183,我最美');
        this.put('classical,184,河蟹');
        this.put('classical,185,羊驼');
        this.put('classical,186,栗子');
        this.put('classical,187,幽灵');
        this.put('classical,188,蛋');
        this.put('classical,189,马赛克');
        this.put('classical,190,菊花');
        this.put('classical,191,肥皂');
        this.put('classical,192,红包');
        this.put('classical,193,大笑');
        this.put('classical,194,不开心');
        this.put('classical,195,啊');
        this.put('classical,196,冷汗');
        this.put('classical,197,冷漠');
        this.put('classical,198,呃');
        this.put('classical,199,好棒');
        this.put('classical,200,拜托');
        this.put('classical,201,点赞');
        this.put('classical,202,无聊');
        this.put('classical,203,托脸');
        this.put('classical,204,吃');
        this.put('classical,205,送花');
        this.put('classical,206,害怕');
        this.put('classical,207,花痴');
        this.put('classical,208,小样儿');
        this.put('classical,209,脸红');
        this.put('classical,210,飙泪');
        this.put('classical,211,我不看');
        this.put('classical,212,托腮');
        this.put('classical,213,哇哦');


        // this.put('classical,1000,潜水');
        // this.put('classical,1001,敬礼');
        // this.put('classical,1002,石化');
        // this.put('classical,1014,加油');
        // this.put('classical,1017,无语');
        // this.put('classical,1022,安慰');
        // this.put('classical,1024,生病');
        // this.put('classical,1027,狂汗');
        // this.put('classical,1028,扮鬼脸');
        // this.put('classical,1029,叹气');
        // this.put('classical,1030,拜托');
        // this.put('classical,1034,烦躁');
        // this.put('classical,1040,惬意');
        // this.put('classical,1042,孤寂');
        // this.put('classical,1070,牵手');
        // this.put('classical,1071,示爱');
        // this.put('classical,1072,情书');
        // this.put('classical,1073,月饼');
        // this.put('classical,1074,玉兔');

    }
}
