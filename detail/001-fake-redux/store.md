# Store

---

![Redux Flow](./images/redux_flow-00.png 'Redux Flow')
![Redux Flow](./images/redux_flow-03.png 'Redux Flow')

## 1. Lý thuyết

- Phần này sẽ tạo kho `store`.
- Trên sơ đồ thấy `Store` sẽ chứa các `state` - `dữ liệu trạng thái`.
- Đầu vào của `store` sẽ là `reducer`, xem như _reducer_ là 1 `callback`
- Lại có `new state` sẽ được tạo từ xử lý `reducer`, nên ta khai báo như sau:

```js
function createStore(reducer){
 let state = reducer()
 ...
}
```

- Dữ liệu state của store sẽ được đẩy qua `VIEW`
- `VIEW` ta sẽ xây dựng nên các `Component` - `Thành phần`
- `Component` : là các thành phần nhỏ lẻ từng chức năng cấu thành nên 1 giao diện VIEW.
  > **ví dụ:** _Giao diện Todo App như sau:_

![Todo App](./images/todo-app.png 'Todo App')

- Thì sẽ bao gồm những Component là:

![Todo App Components](./images/component.png 'Todo App Components')

- (1) Component Input: Cập nhật tên
- (2) Component Show: Hiển thị và điều chỉnh trạng thái
- (3) Component Filter: Lọc các trạng thái

- Khi này xây dựng file `index.html` phần body sẽ tạo tương ứng những `Root` thành phần gốc tương ứng với `Component` như sau:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Todo App</title>
    <link rel="stylesheet" href="./css/base.css" />
    <link rel="stylesheet" href="./css/index.css" />
  </head>

  <body>
    <!-- <div id="root"></div> -->
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          placeholder="What needs to be done?"
          autofocus
        />
      </header>
      <!-- This section should be hidden by default and shown when there are todos -->
      <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox" />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <!-- These are here just to show the structure of the list items -->
          <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
          <li class="completed">
            <div class="view">
              <input class="toggle" type="checkbox" checked />
              <label>Taste JavaScript</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template" />
          </li>
          <li>
            <div class="view">
              <input class="toggle" type="checkbox" />
              <label>Buy a unicorn</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="Rule the web" />
          </li>
        </ul>
      </section>
      <!-- This footer should be hidden by default and shown when there are todos -->
      <footer class="footer">
        <!-- This should be `0 items left` by default -->
        <span class="todo-count"><strong>0</strong> item left</span>
        <!-- Remove this if you don't implement routing -->
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
        <!-- Hidden if no completed items are left ↓ -->
        <button class="clear-completed">Clear completed</button>
      </footer>
    </section>
    <!-- Scripts here. Don't remove ↓ -->
    <script type="module" src="./script.js"></script>
  </body>
</html>
```

## 2. Mô tả xây dựng

- Xem [Xây dựng Store Full](./store/index.md)

### 2.1 Hàm `createStore`

- Xem [Hàm createStore](./store/createStore.md)

### 2.2 Hàm `Render`

- Xem [Hàm Render](./store/renderFn.md)

### 2.3 Phương thức `attach`

- Xem [Phương thức attach](./store/attach.md)

### 2.3 Phương thức `connect`

- Xem [Phương thức connect](./store/connect.md)

### 2.4 Phương thức `dispatch`

- Xem [Phương thức dispatch](./store/dispatch.md)

![Xử lý Render](./images/002.png 'Xử lý Render')
