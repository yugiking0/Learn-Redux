# Thư viện 30 dòng giống Redux - F8

---

## 1. Nội dung

- Thay vì tạo một app Todo bằng cách viết thuần
- Ta sẽ xây dựng nên 1 thư viện Lib, và từ thư viện này sẽ tạo ra app Todo
- Thư viện này sẽ viết lại mô phỏng cách hoạt động của thư viện React và Redux
- _**Key Words:**_

  - Thư viện React và Redux:

    - Store
    - State
    - Actions
    - Reducers
    - Dispatch
    - Component
    - Pure function
    - ...

  - ES6:
    - Method Reduce Syntax
    - Class
    - Module: export. import module
    - Arrow Function
    - Tagged template literals
    - ................

## 2. Lý thuyết

- Thư viện này sẽ mô phỏng cách hoạt động kết hợp của thư viện React và Redux.
- Từ thư viện này sẽ sử dụng để viết ứng dụng TODO App

![Todo App](./images/todo-app.png 'Todo App')

### 2.1 Tìm hiểu cơ chế vận hành React + Redux

![Redux Flow](./images/redux_flow-01.png 'Redux Flow')
![Redux Flow](./images/redux_flow-00.png 'Redux Flow')

- Sẽ gồm 4 thành phần chính:

  - View
  - Actions
  - Reducers
  - Store

- **VIEW** : Thành phần hiển thị giao diện cho User có thể tương tác trên đó.
- **ACTIONS** : Thành phần này sẽ chứa các mô tả những hành động xử lý( tại đây không thực hiện hành động thao tác).
  - **Actions** chỉ là một object với một thuộc tính 'type'. Ngoài ra các thông tin khác trong object đó được coi như là dữ liệu kèm theo.
  - Được hiểu như tập hợp các mô tả về hành động, đơn giản là các events. Xem mục .....
- **Dispatch** : Giữa `View` và `Actions` sẽ có liên kết gọi là `Dispatch`. `Dispatch` là ghi nhận thao tác của người dùng tác động lên giao diện View.
  - Khi người dùng `dispatch` trên `View`, thì luồng dữ liệu sẽ truy cập vào `Actions` lấy ra mô tả hành động `action` tương ứng, sau đó chuyển thông tin `action` này sang `Reduce` xử lý.
- **state** : Là trạng thái dữ liệu và được lưu ở `store`.
- **STORE** : Thành phần lưu các trạng thái `state` ứng dụng, tại đây chỉ có chức năng getValue(state).
- **REDUCERS** : Thành phần chứa các `function` nguyên thủy(`pure function`) gọi là `reduce`;
  - 1 – Trước hết các hàm phải là pure function – Nghĩa là hàm phải trả về cùng một kết quả với đầu vào là như nhau
  - 2 – Nó nên là no side effect – không sử dụng các biến Global, sử dụng gọi bất đồng bộ hoặc phải đợi sử dụng promise để nhận kết quả trả về.
- **reduce** là một hàm nhận đối số đầu vào là `State hiện tại` và thông tin `Action`, sau đó trả về một `State mới` để cập nhật vào `store`.
  - `Predictable`, tức là cùng 1 state, cùng 1 action thì nó luôn luôn cho ra 1 state mới giống nhau, luôn luôn là như vậy.
- **subscribe** : Sau khi `Store` được update do có thêm `state` mới sau xử lý `reduce`, thì thành phần `view` cần được update lại, khi này sẽ dùng chức năng `subscribe`. Ta có thể gọi đây là chức năng `Render` dữ liệu từ `Store` cho `VIEW`.

![Redux Flow](./images/redux_flow-04.png 'Redux Flow')

### 2.2 Dòng dữ liệu

![Redux Flow](./images/redux_flow-02.png 'Redux Flow')
![Redux Flow](./images/redux_flow-03.png 'Redux Flow')

- Dữ liệu từ `Store` bao gồm các `State`(current) sẽ được `Render`, và hiển thị trên `View`.
- Tạo giao diện `View`, người dùng thao tác trên giao diện này được gọi là các `dispatch`.
- Dữ liệu gồm `State`(current) và `dispatch` sẽ được đưa đến thành phần `Actions` chứa các mô tả về các loại `action` để nhận biết `dispatch` đó thuộc `action` nào.
- Sau khi xác định `action`, luồng dữ liệu gồm `State`(current) và `action` sẽ được chuyển tiếp đến thành phần `Reducer` tương ứng `action` xử lý.
- `Reducer` sẽ xử lý các `State`(current) thành `State`(new) và cập nhật vào `store`.
- Do `store` được cập nhật `State`(new) , nên `View` sẽ cần được `Render` lại để cập nhật.
- Như vậy là hết 1 vòng vận hành 1 chiều luồng dữ liệu.

![Redux Flow](./images/redux-workflow1.gif 'Redux Flow')
![Redux Flow](./images/redux-workflow2.gif 'Redux Flow')

## 3. Tìm hiểu ý nghĩa và Xây dựng các thành phần

### 3.1 VIEW

#### 3.1.1 File index.html

- Thành phần này sẽ là giao diện thể hiện cho người dùng sử dụng.
- Ta tạo file `index.html` và phần dữ liệu sẽ không viết các element thành phần chi tiết mà sẽ dùng kiểu **CSR** (Client Side Rendering) thao tác dùng `DOM` để chọn `element id ='root'` để truyền dữ liệu `render` vào đây.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Todo App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
  <script type="module" src="./script.js"></script>
</html>
```

- file `index.html` sẽ link với file `script.js` theo dạng module : ` <script type="module" src="./script.js"></script>`.

#### 3.1.2 File script.js

- Vì dữ liệu `store` sẽ bao gồm các `state` trạng thái chứa dữ liệu, nên ở đây ta sẽ viết 1 hàm để xử lý chuyển 1 mảng danh sách `state`, truyền vào `element #root` như sau:
  - Ví dụ: Có danh sách các loại xe hơi như: BMW, Porsche, Mercedes
  - Ta sẽ render ra bằng cách dùng `ES6 - Tagged template literals` như sau:

```js
const rootElement = document.querySelector('#root');
const cars = ['BMW', 'Porsche', 'Mercedes'];

const html = `
<h1>TODO List</h1>
<ul>
  ${cars.map((car) => `<li>${car}</li>`).join('')}
<ul>
`;
console.log(html);
rootElement.innerHTML = html;
```

- Vì mảng trả về đôi khi sẽ có những dữ liệu không mong muốn như: null, NaN, true, false, undefined,... nên cần loại bỏ xử lý những dữ liệu này, nhưng vẫn giữ lại các giá trị như: 0(Giá trị Truthy và loại bỏ true)

```js
const rootElement = document.querySelector('#root');
const cars = ['BMW', 'Porsche', 'Mercedes', true, undefined, null, NaN, false];
const isSucceeded = false;
const html = `
<h1>${isSucceeded} && TODO List</h1>
<ul>
  ${cars.map((car) => `<li>${car}</li>`).join('')}
<ul>
`;
console.log(html);
rootElement.innerHTML = html;
```

![script](./images/001.png 'script')

- Cũng như ta sẽ chuyển dữ liệu này sang 1 module core xử lý của thư viện để sau này dùng để render các element khác sẽ gặp sau này.

```js
export default function html([first, ...values], ...strings) {
  return values
    .reduce(
      (acc, cur) => {
        return acc.concat(strings.shift(), cur);
      },
      [first]
    )
    .filter((x) => (x && x !== true) || x === 0)
    .join('');
}
```

- Xem mục :
  - Truthy và Falsy
  - Tagged template literals
  - join(''): Nối mảng thành string và Loại bỏ dấu phẩy giữa các phần.
- Khi này script.js sẽ là:

```js
import html from './core.js';
const cars = ['BMW', 'Porsche', 'Mercedes'];
const isSucceeded = false;

const output = html`
  <h1>${isSucceeded} && TODO List</h1>
  <ul>
    ${cars.map((car) => `<li>${car}</li>`)}
    <ul></ul>
  </ul>
`;

const rootElement = document.querySelector('#root');
rootElement.innerHTML = output;
```

- Thì phần `html()` được gọi là `template view `

## 4. Kiểm tra
