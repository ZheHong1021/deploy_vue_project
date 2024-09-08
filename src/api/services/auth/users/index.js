// 先引用 BaseServer取得 CRUD封裝
import BaseService from "@/api/services/BaseService"
import server from "@/api/server"
class UserService extends BaseService{
    constructor(){
        super('users') // 帶入 User為 resource
    }

    // 取得登入當前使用者的資訊
    get_current_user(params) {
        return server.get('current_user/', {params})    
    }

}


// 將封裝的 class匯出
export default new UserService()