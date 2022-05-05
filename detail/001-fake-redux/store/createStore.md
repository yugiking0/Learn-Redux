# Hàm `createStore`

---

- Tạo hàm tạo Store là `createStore`
- Trên sơ đồ thấy `Store` sẽ chứa các `state` - `dữ liệu trạng thái`.
- Đầu vào của `store` sẽ là `reducer`, xem như _reducer_ là 1 `callback` sẽ viết sau này để truyền vào.
- Lại có `new state` sẽ được tạo từ xử lý `reducer`, nên ta khai báo như sau:

```js
function createStore(reducer){
 let state = reducer()
 ...
}
```

- Dữ liệu state của store sẽ được đẩy qua `VIEW`.
- Tạm xem dữ liệu này sẽ được xử lý bởi hàm `html` để truyền vào element có `id = "root"`.

```js
function html([first, ...values], ...strings) {
  return values
    .reduce(
      (acc, cur) => {
        return acc.concat(strings.shift(), cur);
      },
      [first]
    )
    .filter((x) => (x && x !== true) || x === 0)
    .join('');
}
```

- Element có `id = "root"` được gọi là root (Node gốc), và sẽ được render thành chuỗi stringHtml để truyền vào DOM thông qua innerHtml.
- Dữ liệu sẽ được xử lý này ta tạm gọi là roots là một đối tượng đặc biệt kiểu Map() ([Xem về kiểu dữ liệu Map](../object-map.md) ) sẽ có dạng:

```js
function createStore(reducer){
 let state = reducer()

  const roots = new Map(); // Ban đầu thì roots sẽ không có dữ liệu
  /**
   * roots : Map(){
   * key : Value
   * div#root : () => `<h1>Hello World!!!</h1>`
   * root: div#root
   * component : () => `<h1>Hello World!!!</h1>`
   * }
   */

  // attach(() => `<h1>Hello World!!!</h1>`, document.getElementById('root'));
  /**
   * roots : Map(1) {div#root => ƒ}
   * {div#root => () => `<h1>Hello World!!!</h1>`}
   * key: div#root
   * value: () => `<h1>Hello World!!!</h1>`
   * [[Prototype]]: Map
   */
 ...
}
```

- Kiểu dữ liệu Map() sẽ bao gồm 2 thành phần là:
  - `key` sẽ là `element root`
  - `value` sẽ là một `hàm component` để tạo ra được chuỗi `html`, ta sẽ gọi là thành phần `component`.

```js
roots : Map(){
   key : Value
   //Ví dụ: div#root : () => `<h1>Hello World!!!</h1>`
   //Trong đó root: div#root
   //component : () => `<h1>Hello World!!!</h1>`
  }
```

- Ví dụ có:

```js
Map(){
  // key : Value
  div#root : () => `<h1>Hello World!!!</h1>`
}
```

Thì:

- `key` sẽ là `div#root`
- `component` sẽ là `() => '<h1>Hello World!!!</h1>'`

Khi này hàm createStore sẽ là :

```js
function createStore(reducer) {
  let state = reducer();

  const roots = new Map(); // Ban đầu thì roots sẽ không có dữ liệu
}
```
