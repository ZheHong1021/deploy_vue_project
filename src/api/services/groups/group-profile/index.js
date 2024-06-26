// 先引用 BaseServer取得 CRUD封裝
import BaseService from "@/api/services/BaseService"
class GroupProfileService extends BaseService{
    constructor(){
        super('group-profile') // 帶入 GroupProfile為 resource
    }
    

}


// 將封裝的 class匯出
export default new GroupProfileService()