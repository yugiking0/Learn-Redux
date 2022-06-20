# Phương thức `connect`

---

- Hàm xử Lý kết nối giữa `Store` và `View` thông qua lọc các state và xử lý `component`, `props` tương ứng (Lọc các state thích hợp chuyển qua View)
- Vì `Store` luôn chứa tất cả `state`, nên tùy vào màn hình `View` hoặc từng `Component` của VIEW khác nhau mà chỉ cần lấy 1 vài state từ store để hiển thị.

  - Ví dụ:
    - Hiển thị màn hình Home
    - Hiển thị màn hình các nhóm tin chính.

- Vì đôi khi `VIEW` không cần thể hiện `toàn bộ state` của `Store` nên ta truyền vào một `selector` để lọc bớt `state`, và mặc định thì sẽ lấy tất cả state lên.

```js
function connect(selector = state => state){
  ...
}
```

- Xem [Ví dụ xử lý selector ở đây](./others//vidu-selector.md)

```js
function connect(selector = (state) => state) {
  // selector chọn các thành phần state, bình thường sẽ lấy tất cả state
  return (component) =>
    (props, ...args) =>
      component(Object.assign({}, props, selector(state), ...args));
}
```

- `selector = state => state` là một hàm nhận cái gì trả ra cái đó, làm vậy để dòng dưới `selector(state)` -> nhận state sẽ trả ra state, mặc định là vậy. Làm như này thì trong trường hợp em không muốn mặc định components sẽ nhận được cả object state nữa thì em chỉ cần truyền cho "selector" một hàm mới, hàm này sẽ nhận state và trả ra cái gì là tùy

- `selector = state => state` chính là `selector = function (state ) { return state}`

```js
function connect(selector = (state) => state) {
  return (component) => {
    return (props, ...args) => {
      return component(Object.assign({}, props, selector(state), ...args));
    };
  };
}
```

- Ở đây sẽ trả về 1 hàm khác với đối số là `component`,giữa state và component liên quan gì mà trả về được chỗ này. [Cấu trúc state](./others/state.md)

```js
function connect(selector = state => state){
  return component => (props, ...args) =>
    component(Object.assign({}, props, selector(state), ...args))
},
```

- props,args sẽ được nhận

```js
connect(selector = (state) => state) {
    return (component) =>
      (props,args) => //props,args sẽ được nhận khi có đối số ở lần call thứ 3 bên dưới
            component(Object.assign({}, props, selector(state), ...args));
}

// Khi sử dụng method connect
connect()(App)() => App(Object.assign({}, undefined, selector(state), undefined);

```

> Giải thích đoạn `return component` này:

![Return component](../images/connect_code.png 'Return component')

```js
function helloWorld(str) {
  return console.log(str + ' Javascript!');
}

function connect() {
  return (component) => {
    console.log('Hello World');
    return component('Xin chào');
  };
}

const connector = connect();
connector(helloWorld);
connect()(helloWorld); // Giống đoạn code trên

// Hello World
// Xin chào Javascript!
```

Các bạn có thể biến nó thành đoạn code sau:

```js
connect(selector = state => state){
    return component => {
      // Trả về lần 1
        return (props, ...args) => {
          // Trả về lần 2
          return component(Object.assign({}, props, selector(state), ...args)) // Trả về lần 3
        }
    }
}
```

- Lần 1 nó trả về là khi gọi đoạn code sau ở App.js

```js
const connector = connect();
```

- Lần 2 nó trả về là khi gọi đoạn code sau ở App.js

```js
export default connector(App);
```

- Chú ý ngay chỗ này: connector(App) chính là App trong file script.js (export default thì khi import mình có thể đổi tên được)

Chính vì thế khi gọi

```js
attach(App, document.getElementById('root'))
=>
attach(component, root) {
    roots.set(root, component)
    render()
}
```

- thì component chính là connector(App)

- và khi gọi render() thì

```js
const output = component();
```

- tương đương với

```js
const output = connector(App)();
```

- Ta xem lại xử lý Method Connect:

```js
    // let state = reducer();
    function connect(selector = state => state){
      return component => (props, ...args)=>
        component(Object.assign({}, props, selector(state), ...args))
        // Merge các đối tượng vào Object gán vào Object.assign
    },
    /**
    const connector = connect(state=>({
      car: state.car[0],
      cars: state.cars
    }));

    function app({pops}){
      return html `
      <ul>
        ${cars.map(car=>`<li>${car}</li>`)}
      </ul>
      `
    }
    */
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

---

2.2 Hàm connect là hàm đẩy dữ liệu từ store ngược vào view.

- Giá trị mặc định của state là ô tô ['BMW'].

- Trong App.js ta gọi tới hàm connect.

```js
import { connect } from '../store.js';
```

- Hàm connect() thực thi và nó trả lại 1 hàm mới lưu vào hàm connector.

```js
const connector = connect();
```

- connector nhận vào App.

```js
export default connector(App)

connect(selector = state => state) {
    return component => (props, ...args) =>
        component(Object.assign({}, props, selector(state), ...args))
},
```

HAY:

```js
connect(selector = state => state){
  return component => {
    return (props, ...args) => {
      return component(Object.assign({}, props, selector(state), ...args))
    }
  }
}
```

==> connect chạy sẽ return lại 1 arrow function, nhận đối số là 1 component.

- Thế nên kết quả return sẽ được lưu vào connector.

- Mà connector lại là 1 hàm và nó nhận đối số là component chính là App nên nó sẽ trả ra 1 hàm mới nữa ở lần số 3 return.

- Hàm mới này sẽ chạy component của chúng ta, nó sẽ run cái function App.

```js
return component(Object.assign({}, props, selector(state), ...args));
```

- Và nó trả lại 1 Object được hợp nhất bởi props, bởi state (kho dữ liệu của ta) và kể cả những đối số sẽ truyền trong tương lai (...args).

- Cuối cùng ta nhận lại 1 biển props.

- Nó gọi component thực ra là gọi App.

```js
Object.assign({}, props, selector(state), ...args);
```

- truyền vào cars trong function App({ cars }) {...}

  - Vì vậy khi ở App({ cars }) ta nhận được cars luôn ==> giúp ta truyền dữ liệu từ store sang view.

  - Vì cars là mảng nên sau khi return xong sẽ được map qua, trả ra html và đẩy vào hàm html sẽ loại bỏ đi dấu phẩy, boolean nọ kia.

```js
return html`
  <ul>
    ${cars.map((car) => `<li>${car}</li>`)}
  </ul>

  <button onclick="dispatch('ADD', 'Porsche')">Add car</button>
`;
```
