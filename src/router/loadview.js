// 用來載入 view的函式
export function loadView(view) {
    return () => import(`@/views/${view}.vue`);
}