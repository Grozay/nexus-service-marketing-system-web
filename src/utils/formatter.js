export const interceptorLoadingElements = (calling) => {
  // DOM lấy ra toàn bộ phần tử trên page hiện tại có className là 'interceptor-loading'
  const elements = document.querySelectorAll('.interceptor-loading')
  for (let i = 0; i < elements.length; i++) {
    if (calling) {
      // Nếu đang trong thời gian chờ gọi API (calling === true) thì sẽ làm mờ phần tử và chặn click bằng css pointer-events
      elements[i].style.opacity = '0.5'
      elements[i].style.pointerEvents = 'none'
    } else {
      // Ngược lại thì trả về như ban đầu, không làm gì cả
      elements[i].style.opacity = 'initial'
      elements[i].style.pointerEvents = 'initial'
    }
  }
}

export const formatDate = (date) => {
  // Tạo đối tượng Date từ tham số đầu vào
  const dateObj = new Date(date)

  // Lấy các thành phần ngày tháng năm
  const year = dateObj.getFullYear()
  const month = String(dateObj.getMonth() + 1).padStart(2, '0') // Tháng bắt đầu từ 0
  const day = String(dateObj.getDate()).padStart(2, '0')

  // Trả về chuỗi ngày tháng định dạng YYYY-MM-DD
  return `${year}-${month}-${day}`
}