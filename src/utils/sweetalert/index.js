import Swal from 'sweetalert2'

// 刪除警告
export const showDeleteWarning = async (title="刪除警告", text="正在刪除資料") => {
  return await Swal.fire({
    icon: 'warning',
    title: title,
    text: text,
    showCancelButton: true,
    cancelButtonText: '取消',
    confirmButtonText: '刪除',
  })
}

// 確定真的要刪除了
export const showConfirmDelete = async () => {
  const last_response = await Swal.fire({
    icon: 'warning',
    title: "最後一次刪除警告",
    text: `您確定要刪除該筆資料嗎?`,
    showCancelButton: true,
    cancelButtonText: '取消',
    confirmButtonText: '確定刪除',
  })

  if(last_response.isConfirmed){
    return true
  }
  return false
}
