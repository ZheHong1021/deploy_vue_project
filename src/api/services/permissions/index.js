// 先引用 BaseServer取得 CRUD封裝
import BaseService from "@/api/services/BaseService"
import server from "@/api/server"
class PermissionService extends BaseService{
    constructor(){
        super('permissions') // 帶入 Permission為 resource
    }
}


// 將封裝的 class匯出
export default new PermissionService()