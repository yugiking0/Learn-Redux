Phương thức `connect`

- Hàm xử Lý kết nối giữa Store và View thông qua lọc các state và xử lý component, props tương ứng(Lọc các state thích hợp chuyển qua View)
  --> Cần xem lại chỗ này để hiểu hơn ???

```js
    // let state = reducer();
    function connect(selector = state => state){
      return component => (props, ...args)=>
        component(Object.assign({}, props, selector(state), ...args))
        // Merge các đối tượng vào Object gán vào Object.assign
    },

```

- Khi này hàm createStore sẽ thành:

```js
function createStore(reducer) {
  let state = reducer(); // Sử dụng closure

  const roots = new Map();

  // Xử lý Render từng hàm component vào root component thành phần tương ứng
  function render(){
    // Vòng lặp qua roots để chuyển ra VIEW
    for(const [root, component] of roots){
      const output = component();
      root.innerHTML = output;
    }

  // Trả về Object gồm các phương thức để xử lý ra View
  return {
    // 1. Phương thức đẩy component và root element tương ứng vào Roots
    attach(component, root){
      roots.set(root,component); // Sử dụng method set của đối tượng Map()
      render(); // Sau khi gán xong sẽ render ra view luôn
    },

    // 2. Lọc các state thích hợp chuyển qua View
    connect(selector = state => state){
      return component => (props, ...args)=>
        component(Object.assign({}, props, selector(state), ...args))
        // Merge các đối tượng vào Object gán vào Object.assign
    },
    ...
  }
}
```