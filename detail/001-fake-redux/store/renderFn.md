Hàm `Render`

![Xử lý Render](../images/002.png 'Xử lý Render')


- Lúc này ta cần viết 1 hàm xử lý render dữ liệu từ Biến `roots` lưu các gốc Element chuyển thành các component ở View thông qua DOM như sau:

```js
  function render(){
    // Vòng lặp qua roots để chuyển ra VIEW
    for(const [root, component] of roots){
      const output = component(); // Callback html() ra chuỗi
      root.innerHTML = output; // Gán chuỗi html vào element #root để hiển thị
    }
```

- Ở đây component sẽ là 1 hàm callback xử lý trả về chuỗi root element tương ứng với đối tượng root cần gán.
- Ví dụ: component sẽ là hàm html, và sẽ đưa chuỗi html vào root id.
- Ngoài ra thì có thể là: Đưa xử lý nhập Tên todo-list và lưu lại, sử dụng component là componentInput

Khi này hàm `createStore` sẽ là :

```js
function createStore(reducer) {
  let state = reducer(); // Sử dụng closure

  const roots = new Map();

  function render(){
    // Vòng lặp qua roots để chuyển ra VIEW
    for(const [root, component] of roots){
      const output = component();
      root.innerHTML = output;
    }
}
```