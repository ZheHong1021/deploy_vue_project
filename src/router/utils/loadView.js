// 用來載入 view的函式
export const loadView = (view) => {
    return () => import(`@/views/${view}.vue`);
}

