// src/errorHandler.js
import Swal from 'sweetalert2';
import router from '@/router';


// [錯誤訊息的回傳]
//   {
//     "error": {
//         "name": [
//             "該角色代號已經存在!"
//         ],
//         "name_zh": [
//             "該角色名稱已經存在!"
//         ]
//     },
//     "status_code": 400
// }
// 整理錯誤訊息的顯示方式
function extractErrorMessage(errorData) {
  // 先確認有無 error關鍵attr
  if (errorData.error) {

    // 如果該錯誤訊息為字串 => 直接回傳
    if (typeof errorData.error === 'string') {
      return errorData.error;
    } 
    
    // 處理多欄位錯誤訊息(通常情況為陣列)
    else {
      // 這邊會將所有錯誤訊息欄位的內容整理起來
      // ["該角色代號已經存在!", "該角色名稱已經存在!"]
      const errors = Object.values(errorData.error).flat()
      return errors[0] // 通常就顯示第一個就好了
    }
  }
  return '發生未知錯誤，請稍後再試。';
}


export function errorHandler(error) {
  if (error.response) {
    // 取得該回應的method
    const method = error.response.config.method
    const method_hash_map_title = { // 用於顯示的文字
      "get": '查詢',
      "post": '新增',
      "put": '更新',
      "delete": '刪除'
    }

    // 取得該method的中文名稱
    const method_title = method_hash_map_title[method]

    // 取得該錯誤的標題
    const title = `${method_title}發生錯誤`
    
    // 取得該回應的data
    const response_data = error.response?.data

    // 取得該回應的status code
    const status = error.response.status

    // 排查錯誤代號
    switch (status) {

      case 400:
        if (response_data) {
          Swal.fire({
              title: title, 
              text: extractErrorMessage(response_data), 
              icon: "error",
              confirmButtonText: "確認",
          })
        }

        break;

      case 401:
        if (response_data) {
          const error_status_title = "身分未被授權"
          const error_message = extractErrorMessage(response_data)
          Swal.fire({
              title: title, 
              html: `<strong>【錯誤問題】：${error_status_title}</strong><br><br>${error_message}`, 
              icon: "error",
              confirmButtonText: "確認",
              footer: '<a href="/login">請重新登入</a>'
          })
        }

        // 重新導向至 401 頁面
        router.push({
          name: '401_Unauthorized' 
        })

        break;

      case 403:
        if (response_data) {
          const error_status_title = "權限不足禁止訪問"
          const error_message = extractErrorMessage(response_data)
          Swal.fire({
              title: title, 
              html: `<strong>【錯誤問題】：${error_status_title}</strong><br><br>${error_message}`, 
              icon: "error",
              confirmButtonText: "確認",
              footer: '請確認您的權限是否足夠'

          })
        }

        // 重新導向至 403 頁面
        router.push({
          name: '403_Forbidden' 
        })
        break;


      case 404:
        if (response_data) {
          const error_status_title = "找不到資源"
          const error_message = extractErrorMessage(response_data)
          Swal.fire({
              title: title, 
              html: `<strong>【錯誤問題】：${error_status_title}</strong><br><br>${error_message}`, 
              icon: "error",
              confirmButtonText: "確認",
              footer: '請確認您的網址是否正確'
          })
        }

        // 重新導向至 404 頁面
        router.push({
          name: '404_NotFound' 
        })


        break;

      case 500:
        if (response_data) {
          const error_status_title = "伺服器發生了點問題"
          const error_message = extractErrorMessage(response_data)
          Swal.fire({
              title: title, 
              html: `<strong>【錯誤問題】：${error_status_title}</strong><br><br>${error_message}`, 
              icon: "error",
              confirmButtonText: "確認",
              footer: '請聯絡開發人員!'
          })
        }

        // 重新導向至 500 頁面
        // router.push({
        //   name: '500_InternalServerError' 
        // })

        break;


      // 處理其他狀態碼
      default:
        Swal.fire("Default Error", "", "error")
    }
  }
}