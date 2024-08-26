// 先引用 BaseServer取得 CRUD封裝
import BaseService from "@/api/services/BaseService"

class MenuService extends BaseService{
    constructor(){
        super('menus') // 帶入 Menu為 resource
    }
}


// 將封裝的 class匯出
export default new MenuService()