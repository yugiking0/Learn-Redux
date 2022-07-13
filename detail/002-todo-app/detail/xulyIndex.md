# Xử lý tách Components

---

## 1. Xử lý lại file index.htm

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Template • TodoMVC</title>
    <link rel="stylesheet" href="./css/base.css" />
    <link rel="stylesheet" href="./css/style.css" />
  </head>
  <body>
      <div id="root"></div>
    <script type="module" src="./script.js"></script>
  </body>
</html>

```

## 2. Xử lý file reducer.js

```js
const data = {
  items: [
    {
      title: 'Learn Javascript',
      completed: true,
    },
    { title: 'Learn CSS', completed: true },
    { title: 'Learn HTML', completed: false },
  ],
};

export default function reducer(state = data, action, args) {
  switch (action) {
    default:
      return state;
  }
}
```

## 3. Xử lý file store.js

```js
import reducer from "./reducer.js";
import { createStore } from "./core.js";

const {attach, connect, dispatch } = createStore(reducer);

window.dispatch = dispatch;

export {
  attach, connect
}
```