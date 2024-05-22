// 先引用 BaseServer取得 CRUD封裝
import BaseService from "@/api/services/BaseService"

class OrderService extends BaseService{
    constructor(){
        super('orders') // 帶入 order為 resource
    }
}


// 將封裝的 class匯出
export default new OrderService()