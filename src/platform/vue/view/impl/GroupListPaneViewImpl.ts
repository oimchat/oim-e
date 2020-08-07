import AbstractListPaneView from '@/platform/vue/view/impl/AbstractListPaneView';
import AppContext from '@/app/base/context/AppContext';
import ListData from '@/impl/data/ListData';
import groupListPaneViewModel from '@/platform/vue/view/model/GroupListPaneViewModel';

export default class GroupListPaneViewImpl extends AbstractListPaneView {

    public constructor(protected appContext: AppContext) {
        super(appContext);
        groupListPaneViewModel.nodes = this.listBox.nodes;
    }
}
