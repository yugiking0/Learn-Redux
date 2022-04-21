// Import module 
import { createStore } from "./core.js"; // Khởi tạo Store
import reducer from "./reducer.js"; // Ở đoạn xử lý cần gọi reducer : let state = reducer(); 
// export default function reducer(state=init,action,args){...}

// Khai báo Destructuring {attach, dispatch, connect} từ return Obj thực thi createStore
const {attach, dispatch, connect} = createStore(reducer);
/**
 * return {
 *  // 1. Phương thức đẩy component vào Root element
    attach(component, root){ // Sẽ đẩy các thành phần component vào root
    },
    // 2. Lọc các state thích hợp chuyển qua View
    connect(selector = state=>state){// selector chọn các thành phần state
    },
    // 3. Dispatch : Thao tác người dùng tác động trên VIEW sẽ đẩy hành động
     dispatch(action,...args){
    }
  }
 */

// Gán dispatch thành biến Global để sử dụng
window.dispatch = dispatch;

// Đẩy tiếp ra module để dùng
export {
  attach,
  connect,
} 