# Chạy thử thư viện React - Redux

---

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
import { attach, connect } from './store.js';
import App from './app.js';

attach(App(), document.getElementById('root'));
```

## 4. Tạo App.js

```js

```
