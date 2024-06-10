// 先引用 BaseServer取得 CRUD封裝
import BaseService from "@/api/services/BaseService"

class RouteService extends BaseService{
    constructor(){
        super('routes') // 帶入 Route為 resource
    }
}


// 將封裝的 class匯出
export default new RouteService()