import AbstractListPaneView from '@/platform/vue/view/impl/AbstractListPaneView';
import AppContext from '@/app/base/context/AppContext';
import contactListPaneViewModel from '@/platform/vue/view/model/ContactListPaneViewModel';

export default class ContactListPaneViewImpl extends AbstractListPaneView {

    public constructor(protected appContext: AppContext) {
        super(appContext);
        contactListPaneViewModel.nodes = this.listBox.nodes;
    }
}
