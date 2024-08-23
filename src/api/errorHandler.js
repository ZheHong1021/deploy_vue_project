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
    const status = error.response.status
    const response_data = error.response?.data

    // 排查錯誤代號
    switch (status) {

      case 400:
        if (response_data) {
          Swal.fire({
              title: "發生錯誤", 
              text: extractErrorMessage(response_data), 
              icon: "error",
              confirmButtonText: "確認",
          })
        }

        break;

      case 401:
        if (response_data) {
          Swal.fire({
              title: "身分未被授權", 
              text: extractErrorMessage(response_data), 
              icon: "error",
              confirmButtonText: "確認",
          })
        }

        // 重新導向至 401 頁面
        router.push({
          name: '401_Unauthorized' 
        })

        break;

      case 403:
        if (response_data) {
          Swal.fire({
              title: "權限不足禁止訪問", 
              text: extractErrorMessage(response_data), 
              icon: "error",
              confirmButtonText: "確認",
          })
        }

        // 重新導向至 403 頁面
        router.push({
          name: '403_Forbidden' 
        })
        break;


      case 404:
        if (response_data) {
          Swal.fire({
              title: "找不到資源", 
              text: extractErrorMessage(response_data), 
              icon: "error",
              confirmButtonText: "確認",
          })
        }

        // 重新導向至 404 頁面
        router.push({
          name: '404_NotFound' 
        })


        break;

      case 500:
        if (response_data) {
          Swal.fire({
              title: "伺服器發生了點問題", 
              text: extractErrorMessage(response_data), 
              icon: "error",
              confirmButtonText: "確認",
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