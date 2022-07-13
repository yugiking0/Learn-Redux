# Chuẩn bị các files

---

- [Chuẩn bị các files](#chuẩn-bị-các-files)
  - [File core.js](#1-file-corejs)
  - [File reducer.js](#2-file-reducerjs)
  - [File store.js](#3-file-storejs)
  - [File index.html](#4-file-indexhtml)
  - [File script.js](#5-file-scriptjs)


## 1. File core.js

```js
// core.js
export default function html([first, ...values], ...strings) {
  return strings
    .reduce((acc, cur) => {
        return acc.concat(cur, values.shift());
      },[first])
    .filter((x) => (x && x !== true) || x === 0)
    .join('');
}

export function createStore(reducer) {
  let state = reducer();
  let roots = new Map();
  function render() {
    for (const [root, component] of roots) {
      let output = component();
      root.innerHTML = output;
    }
  }

  return {
    attach(component, root) {
      roots.set(root, component);
      render();
    },
    connect(selector = (state) => state) {
      return (component) => (props, args) =>
        component(Object.assign({}, props, selector(state), args));
    },
    dispatch(action, ...args) {
      state = reducer(state, action, args);
      render();
    },
  };
}
s;
```

## 2. File reducer.js

```js
const init = {
  items: [
    {
      title: 'Learn Javascript',
      completed: true,
    },
    {
      title: 'Learn HTML',
      completed: false,
    },
    {
      title: 'Learn NodeJS',
      completed: true,
    },
  ],
};

export default function reducer(state = init, action, args) {
  switch (action) {
    default:
      return state;
  }
}
```

## 3. File store.js

```js
import reducer from './reducer.js';
import { createStore } from './core.js';

const { attach, connect, dispatch } = createStore(reducer);
window.dispatch = dispatch;
export { attach, connect };
```

## 4. File index.html

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Template • TodoMVC</title>
		<link rel="stylesheet" href="./css/base.css">
		<link rel="stylesheet" href="./css/style.css">
	</head>
	<body>
		<div id="root"></div>
		<script type ="module" src="./script.js"></script>
	</body>
</html>
```

## 5. File script.js

```js
import { attach } from './js/store.js';
import app from './js/app.js';

attach(app, document.getElementById('root'));
```