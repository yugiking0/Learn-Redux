Phương thức `dispatch`

- Phương thức này sẽ thực hiện xử lý khi thao tác người dùng tác động trên VIEW sẽ đẩy hành động action + state vào reducer.

- Ở đây xem như thao tác sẽ tác động truyền vào reducer xử lý luôn.

- **reducer**: hiểu tương tự như `reduce` sẽ truyền vào giá trị ban đầu, biến đổi và tạo thành giá trị tích trữ mới.

```js
function dispatch(action, ...args) {
  state = reducer(state, action, args); // reducer xem như callback
  // Tạo state mới từ state cũ, action và các tham số khác.
  // state được thay đổi mới -> store sẽ được update lại, và cần VIEW thay đổi lại.
  render(); // Update lại VIEW
}
```

- Khi này hàm `createStore` sẽ thành:

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

    // 3. Dispatch : Thao tác người dùng tác động trên VIEW sẽ đẩy hành động
    dispatch(action,...args){
      state = reducer(state, action, args);
      render(); // Update lại VIEW
    }
  }
}
```

![Xử lý Render](../images/002.png 'Xử lý Render')

2.3 Hàm dispatch

- Khi bắt sự kiện onclick nó sẽ gọi dispatch sẽ truyền 1 action và value

```html
<button onclick="dispatch('ADD', 'Porsche')">Add car</button>
```

- Khi dispatch được chạy nó sẽ gọi reducer, nó lấy giá trị state có giá trị từ lần trước đó là BMW, nó đẩy ngược vào state làm đối số đầu vào.

```js
dispatch(action, ...args) {
    state = reducer(state, action, args)
    render()
}
```

- Và nó đẩy action sang, dữ liệu mới sang (args)

- Trong reducer, ta lai bắt trường hợp nếu mà action là 'ADD' thì ta lấy ra dữ liệu mới từ args là newCar

```js
case 'ADD':
  const [newCar] = args
  return {
      ...state,
      cars: [...state.cars, newCar]
  }
```

- Và ta return lại 1 object mới, nhưng object mới lại được tạo ra từ object cũ và nó chỉ sửa cars bằng cách thêm newCar vào cuối mảng thôi.

- Nó thỏa mãn điều kiện là nhận state cũ và nó chỉnh sửa rồi nó đẩy ra state mới.

- state mới được đẩy ra rồi, nó gọi lại hàm render()

```js
function render() {
  for (const [root, component] of roots) {
    // component là những thành phần chứa view.
    const output = component();
    root.innerHTML = output;
  }
}
```

- Hàm render() được gọi lại thì nó lại gọi component(), và component() lại là App.

- Để gọi App thì lại phải thông qua connector => lại thông qua connect() và cuối cùng nó lại vòng lại và lấy được state mới.

```js
connect((selector = (state) => state));
```

- Vì state được update mới ở đây (dòng dưới) rồi, nó lại vòng lên connect trên nó lấy lại state mới => view bên html`` nhận được ô tô mới và nó render lại.

```js
state = reducer(state, action, args);
```
