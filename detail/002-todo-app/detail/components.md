# Xử lý tách Components

---

```
TODO APP
│   index.html
│   temp.html*
│   scrip.js
│
└───folder-css
|       base.css*
|       style.css*
└───folder-js
    │   core.js
    │   reducer.js
    │   store.js
    │   app.js
    └───folder-components
           app.js
           header.js
           main.js
           item.js
           footer.js
```

## 1. Xử lý lại file script.js

```js
import { attach } from './js/store.js';
import app from './js/components/app.js';

attach(app, document.getElementById('root'));
```

## 2. Bổ sung file app.js

- File app.js sẽ xử lý render ra các components

```js
import { connect } from '../store.js';
import html from '../core.js';
const connector = connect();

function app() {
  return html` <section class="todoapp">TODO APP</section> `;
}

export default connector(app);
```

## 3. Tách components từ file app.js

## 3.1 Thêm headerComponent

- Thêm file header.js ở components

```js
import html from '../core.js';

export default function header() {
  return html`
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo" placeholder="What needs to be done?" autofocus />
    </header>
  `;
}
```

- File app.js sửa lại thành

```js
import { connect } from '../store.js';
import html from '../core.js';
import header from './header.js';

const connector = connect();

function app() {
  return html` <section class="todoapp">${header()}</section> `;
}

export default connector(app);
```

- Khi này giao diện sẽ là:

![Thêm Header](../images/header.png 'Thêm Header')

## 3.2 Thêm mainComponent

- Thêm main.js

```js
import html from '../core.js';

export default function main() {
  return html`
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox" />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list"></ul>
    </section>
  `;
}
```

- File app.js sửa lại thành

```js
import { connect } from '../store.js';
import html from '../core.js';
import header from './header.js';
import main from './main.js';

const connector = connect();

function app() {
  return html` <section class="todoapp">${header()} ${main()}</section> `;
}

export default connector(app);
```

## 3.3 Thêm component item thuộc main.js

- Thêm file item.js

```js
import html from '../core.js';

export default function item() {
  return html`
    <li class="completed">
      <div class="view">
        <input class="toggle" type="checkbox" checked />
        <label>Taste JavaScript</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="Create a TodoMVC template" />
    </li>
  `;
}
```

- Sửa file main.js thành

```js
import html from '../core.js';
import item from './item.js';

export default function main() {
  return html`
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox" />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        ${item()} ${item()} ${item()}
      </ul>
    </section>
  `;
}
```

- Khi này giao diện sẽ là:

![Thêm item](../images/main.png 'Thêm item')

## 3.4 Thêm footer Component

- Thêm file footer.js

```js
import html from '../core.js';

export default function footer() {
  return html`
    <footer class="footer">
      <span class="todo-count"><strong>0</strong> item left</span>
      <ul class="filters">
        <li>
          <a class="selected" href="#/">All</a>
        </li>
        <li>
          <a href="#/active">Active</a>
        </li>
        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>
      <button class="clear-completed">Clear completed</button>
    </footer>
  `;
}
```

- File app.js sửa lại thành

```js
import { connect } from '../store.js';
import html from '../core.js';
import header from './header.js';
import main from './main.js';
import footer from './footer.js';

const connector = connect();

function app() {
  return html`
    <section class="todoapp">${header()} ${main()} ${footer()}</section>
  `;
}

export default connector(app);
```

- Khi này giao diện sẽ là:

![Thêm item](../images/footer.png 'Thêm item')

Như vậy là hoàn chỉnh chuyển file index.html thành các components được render lại.

---
