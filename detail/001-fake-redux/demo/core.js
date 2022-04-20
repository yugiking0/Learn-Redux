// Hàm xử lý Tagged template literals
export default function html([first, ...values], ...strings) {
  // console.log('first::',first);
  // console.log('values::',values);
  // console.log('strings::',strings);

  return values.reduce((acc, cur) => {
        return acc.concat( strings.shift(), cur);
      },[first])
    .filter((x) => (x && x !== true) || x === 0)
    .join('');
}

// Vì Store sẽ nhận tham số truyền vào từ Reducer 
// nên sẽ truyền vào luôn callback reducer
export function createStore(reducer){
  // Tạo state trạng thái - dữ liệu của store
  let state = reducer(); 
  // Do newState sẽ được tạo bởi reducer, dữ liệu ban đầu của store
  // Khi dùng sẽ viết các reducer sử dụng sau.

  /**
   * Dữ liệu sẽ được đẩy từ Store sang View
   * - Sẽ dùng hàm html để render ra các elements
   * - Dữ liệu truyền vào hàm html là các Components(Các thành phần)
   * - Sau khi xử lý html các Components sẽ được gán vào #roots bên file html
   * - Roots: Gốc thành phần chứa các Components tạo các root để render ra View
   * - roots sẽ có kiểu dữ liệu là Map()
   */
  const roots = new Map(); // Ban đầu thì roots sẽ không có dữ liệu
  /**
   * roots : Map(){
   * key : Value
   * div#root : () => `<h1>Hello World!!!</h1>`
   * root: div#root
   * component : () => `<h1>Hello World!!!</h1>`
   * }
   */

  // attach(() => `<h1>Hello World!!!</h1>`, document.getElementById('root'));
  /**
   * roots : Map(1) {div#root => ƒ}
   * {div#root => () => `<h1>Hello World!!!</h1>`}
   * key: div#root
   * value: () => `<h1>Hello World!!!</h1>`
   * [[Prototype]]: Map
   */
/**
 * roots {
 * 
 * }
 */
  function render(){
    // Vòng lặp qua roots để chuyển ra VIEW
    for(const [root, component] of roots){
      console.log(root);
      console.log(component);
      const output = component(); // Callback html() ra chuỗi 
      root.innerHTML = output; // Gán chuỗi html vào element #root để hiển thị
    }
  }

  // Trả về Object gồm các phương thức để xử lý ra View
  return {
    // 1. Phương thức đẩy component vào Root element
    attach(component, root){ // Sẽ đẩy các thành phần component vào root
      // Gán vào roots gốc theo key là root
      roots.set(root,component);
      render(); // Sau khi gán xong sẽ render ra view luôn
    },
    // 2. Lọc các state thích hợp chuyển qua View
    connect(selector = state=>state){// selector chọn các thành phần state, bình thường sẽ lấy tất cả state
      // Mặc định sẽ là state mặc định luôn.
      return component=>(props, ...args)=>
        component(Object.assign({},props,selector(state), ...args))
        // Merge các đối tượng vào Object gán vào
    },

    // 3. Dispatch : Thao tác người dùng tác động trên VIEW sẽ đẩy hành động
    // Ở đây xem như thao tác sẽ tác động truyền vào reducer xử lý luôn.
    /**
     * reducer: hiểu tương tự như reduce sẽ truyền vào giá trị ban đầu, biến đổi và tạo thành giá trị tích trữ mới.
     */
    dispatch(action,...args){
      state = reducer(state, action, args); // reducer xem như callback
      // Tạo state mới từ state cũ, action và các tham số khác.
      // state được thay đổi mới -> store sẽ được update lại, và cần VIEW thay đổi lại.
      render(); // Update lại VIEW
    }

  }
}