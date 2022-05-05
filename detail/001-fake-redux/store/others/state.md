# Cấu trúc State của store


```js
function createStore(reducer){
  // Tạo state trạng thái - dữ liệu của store
  let state = reducer();
  ...
  return {
    attach(component, root){
      ...
    },
    /**
      const connector = connect(state=>({
      car: state.car[0],
      cars: state.cars
    }));
    */
    connect(selector = state => state){// selector chọn các thành phần state, bình thường sẽ lấy tất cả state
      return component => (props, ...args)=>
        component(Object.assign({}, props, selector(state), ...args))
    },
    dispatch(action,...args){
      state = reducer(state, action, args);
      render();
    }
  }
}
```

- Và reducer sẽ là:

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

const { attach, dispatch, connect } = createStore(reducer);
```

- Scripts

```js
import html from './core.js';
import { attach, connect } from './store.js'; // Lấy dữ liệu từ store ra VIEW
const connector = connect();

function appRender({ cars }) {
  console.log('props::', cars);
  return html`
    <ul>
      ${cars.map((car) => `<li>${car}</li>`)}
    </ul>
  `;
}

attach(connector(appRender), document.querySelector('#root'));
```
