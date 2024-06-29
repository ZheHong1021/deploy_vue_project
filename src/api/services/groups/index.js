// 先引用 BaseServer取得 CRUD封裝
import BaseService from "@/api/services/BaseService"
import server from "@/api/server"
class GroupService extends BaseService{
    constructor(){
        super('groups') // 帶入 Group為 resource
    }
    
    get_all_group_with_profiles(params){
        return server.get(`group-with-profiles/`, {params})
    }
    get_by_id_group_with_profiles(id, params){
        return server.get(`group-with-profiles/${id}/`, {params})
    }
}


// 將封裝的 class匯出
export default new GroupService()