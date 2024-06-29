// 先引用 BaseServer取得 CRUD封裝
import BaseService from "@/api/services/BaseService"

class UserService extends BaseService{
    constructor(){
        super('users') // 帶入 User為 resource
    }
}


// 將封裝的 class匯出
export default new UserService()