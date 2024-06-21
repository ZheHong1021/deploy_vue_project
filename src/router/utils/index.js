import store from '@/store';

const checkAuthIsLoggedIn = (to) => {
    // [是否登入]: 不存在會返回 undefined
    const isLoggedIn = store.getters['auth/isLoggedIn']

    // 確認該route中的meta有無登入驗證的需求
    const metaIncludeRequireAuth = to.matched.some((route) => route['meta']['requireAuth'])

    // 如果需要驗證但沒登入 => true
    // 反之 => false
    return metaIncludeRequireAuth && !isLoggedIn
}


export {
    checkAuthIsLoggedIn
}