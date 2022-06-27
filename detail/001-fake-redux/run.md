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
const init = {
  cars: ['BMW'],
};

export default function reducer(state = init, action, args) {
  switch (action) {
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
  console.log('props::', props);
  return html`
    <ul>
      ${props.cars.map((car) => `<li>${car}</li>`)}
    </ul>
    <button onclick="dispatch('ADD', 'PORSCHE')">Add car</button>
  `;
}
export default connector(appComponent);
```
