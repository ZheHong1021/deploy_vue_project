// 集中管理 API列表

// Order
import OrderService from '@/api/services/orders'
import UserService from '@/api/services/users'
import GroupService from '@/api/services/groups'
import GroupProfileService from '@/api/services/groups/group-profile'
import MenuService from '@/api/services/menus'
import ProductService from '@/api/services/products'
import ProductCategoryService from '@/api/services/products/category'
import apiAuthToken  from '@/api/services/token'

export {
    OrderService,
    UserService,
    GroupService,
    GroupProfileService,
    MenuService,
    apiAuthToken,
    ProductService,
    ProductCategoryService,
}


