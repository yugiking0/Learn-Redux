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

- Khi này xây dựng file `index.html` phần body sẽ tạo tưng ứng những `Root` thành phần gốc tương ứng với `Component` như sau:

```html

```

## 2. Mô tả xây dựng
