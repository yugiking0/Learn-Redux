# Phương thức `attach`
---

![Phương thức attach](../images/attach.png 'Phương thức attach')

- Ban đầu đối tượng roots chưa có dữ liệu, nên cần xây dựng 1 hàm đẩy dữ liệu tương ứng từng component và root vào roots như sau:

```js
const roots = new Map();

function attach(component, root) {
  roots.set(root, component); // Sử dụng method set của đối tượng Map()
  render(); // Sau khi gán xong sẽ render ra view luôn
}
```

- Khi này hàm `createStore` sẽ thành:

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
    ...
  }
}
```
- Sau khi Roots có dữ liệu, thì dùng hàm render hiển thị kết quả lên VIEW.
