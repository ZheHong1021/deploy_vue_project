// 集中管理 API列表

// Order
import apiAuthToken  from '@/api/services/auth/token'
import UserService from '@/api/services/auth/users'
import GroupService from '@/api/services/auth/groups'
import GroupProfileService from '@/api/services/auth/groups/group-profile'
import PermissionService from '@/api/services/auth/permissions'
import MenuService from '@/api/services/auth/menus'

import OrderService from '@/api/services/orders'
import ProductService from '@/api/services/products'
import ProductCategoryService from '@/api/services/products/category'

export {
    apiAuthToken,
    UserService,
    GroupService,
    GroupProfileService,
    PermissionService,
    MenuService,
    OrderService,
    ProductService,
    ProductCategoryService,
}


