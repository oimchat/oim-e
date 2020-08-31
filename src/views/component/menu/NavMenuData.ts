import NavMenuItemData from '@/views/component/menu/NavMenuItemData';

class NavMenuData {

    public collapse: boolean = true;
    public activeMenu: string = '';
    public textColor: string = '#000000';
    public backgroundColor: string = '#ffffff';
    public activeTextColor: string = '#409EFF';
    public items: NavMenuItemData[] = [];
}

export default NavMenuData;
