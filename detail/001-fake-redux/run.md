# Chạy thử thư viện React - Redux

---

- [Demo](./note_demo/index2.html)
  Các file:

1. [core](./note_demo/core.js)
1. [reducer](./note_demo/reducer.js)
1. [store](./note_demo/store.js)
1. [script](./note_demo/script.js)
1. [component](./note_demo/component.js)

## 1. Tạo Reducer.js

```js
// DATA
var init = {
  cars: ['toyota', 'honda', 'porsche'],
};

// reducer.js getDATA and createACTIONs
export default function reducer(action, state = init, ...args) {
  console.log(action);
  switch (action) {
    case 'ADD': // action add, edit, delete...
      let [newCar] = args;
      return {
        cars: [...state.cars, newCar],
      };
      break;
    case 'DEL': // action add, edit, delete...
      const index = args[0];
      console.log('args::', index, state);
      if (index > -1) {
        state.cars.splice(index, 1); // 2nd parameter means remove one item only
      }
      return state;
      break;
    default:
      return state;
  }
}
```

## 2. Tạo store.js

```js
import { createStore } from './core.js';
import reducer from './reducer.js';

// function createStore(reducer){}
const { attach, connect, dispatch } = createStore(reducer);
// const {attach, connect, dispatch} = createStore(reducer(state =  initState, action, ...args));

window.dispatch = dispatch;

export { attach, connect };
```

## 3. Viết lại main.js

```js
import doApp from './App.js';
import { attach } from './store.js'; // Lấy dữ liệu từ store ra VIEW

// attach(component, root){ // Sẽ đẩy các thành phần component vào root
// attach(() => `<h1>Hello World!!!</h1>`, document.getElementById('root'));

attach(doApp, document.getElementById('root'));
```

## 4. Tạo App.js

```js
// Viết component thay cho dùng:
// attach(component, root){ // Sẽ đẩy các thành phần component vào root
// attach(() => `<h1>Hello World!!!</h1>`, document.getElementById('root'));
import html from './core.js';
import { connect } from './store.js';

// const connector = connect(state=>({
//   car: state.car[0],
//   cars: state.cars
// }));

const connector = connect();

function appComponent(props) {
  return html`
    <h1>Todo App</h1>
    <ul>
      ${props.cars.map(
        (car, index) =>
          `<li>${car} <button onClick = "dispatch('DEL', '${index}')" >Xóa</button> </li>`
      )}
    </ul>
    <button onClick="dispatch('ADD','DuyDQ')">Thêm</button>
  `;
}

export default connector(appComponent);
```
