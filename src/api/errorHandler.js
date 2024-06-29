// src/errorHandler.js

import Swal from 'sweetalert2';

export function errorHandler(error) {
  if (error.response) {
    const status = error.response.status
    const response_data = error.response?.data

    // 排查錯誤代號
    switch (status) {

      case 400:
        if (response_data) {
          const { status_code, detail } = response_data
          Swal.fire({
              title: "發生錯誤", 
              text: detail || '請求錯誤', 
              icon: "error",
              confirmButtonText: "確認",
          })
        }
        break;

      case 500:
       
        break;


      // 處理其他狀態碼
      default:
        Swal.fire("Default Error", "", "error")
    }
  }
}