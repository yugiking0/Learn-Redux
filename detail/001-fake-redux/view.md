# VIEW

---

## 1. Nội dung

- **View** : Thành phần này sẽ là giao diện thể hiện cho người dùng sử dụng.
- **VIEW** sẽ không viết kiểu các `element` thành phần chi tiết mà sẽ dùng kiểu **CSR** (Client Side Rendering).

## 2. VIEW

#### 2.1 File index.html

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

#### 2.2 File script.js

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

## 3. Kiểm tra
