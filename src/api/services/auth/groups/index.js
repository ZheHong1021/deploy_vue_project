// 先引用 BaseServer取得 CRUD封裝
import BaseService from "@/api/services/BaseService"
import server from "@/api/server"
class GroupService extends BaseService{
    constructor(){
        super('groups') // 帶入 Group為 resource
    }
}


// 將封裝的 class匯出
export default new GroupService()