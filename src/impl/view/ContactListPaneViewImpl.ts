import AbstractListPaneView from '@/impl/view/AbstractListPaneView';
import AppContext from '@/app/base/context/AppContext';
import ListData from '@/impl/data/ListData';

export default class ContactListPaneViewImpl extends AbstractListPaneView {

    public constructor(protected appContext: AppContext) {
        super(appContext);
        this.listBox.nodes = ListData.userNodes;
    }
}
