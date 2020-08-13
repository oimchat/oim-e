import VisibleView from '@/app/com/client/common/view/VisibleView';
import Group from '@/app/com/main/module/business/group/bean/Group';

export default interface GroupInfoView extends VisibleView {

    setGroup(group: Group): void;
}
