### Execute Function & Callback

1. doFunc()
1. doFunc()()
1. doFunc()()()
1. doFunc(parameters)
1. doFunc(parameters)()
1. doFunc(callback)
1. doFunc()(callback)
1. doFunc(callback)()
1. doFunc()(callback)()
1. doFunc(withLogs(callBack))
1. doFunc(doSomething(withLogs(callBack)))

---

### 1. doFunc()

- Thực hiện một hàm

```js
function execLogger() {
  return console.log('Message:', 'Hello World!');
}
execLogger();

//Message: Hello World!
```

### 2. doFunc()()

```js
function execLogger() {
  console.log('Hi!!!');
  return function () {
    console.log('Message:', 'Hello World!');
  };
}
```

- Khi thực thi 1 lần

```js
execLogger();
// Hi!!!
```

- Thực thi 2 lần

```js
execLogger()();
// Hi!!!
// Message: Hello World!
```

- Có thể viết lại thành kiểu Arrow Function như sau:

```js
function execLogger() {
  console.log('Hi!!!');
  return () => console.log('Message:', 'Hello World!');
}
execLogger()();
// Hi!!!
// Message: Hello World!
```

### 3. doFunc()()()

- Ta có hàm như sau:

```js
function execLogger() {
  console.log('Lần 1');
  return () => {
    console.log('Lần 2');
    return () => console.log('Message:', 'Hello World!');
  };
}
execLogger();
// Lần 1
execLogger()();
// Lần 1
// Lần 2
execLogger()()();
// Lần 1
// Lần 2
// Message: Hello World!
```

- Nếu ta bỏ đi một số `console.log('')` để gọn lại

```js
function execLogger() {
  return () => () => console.log('Message:', 'Hello World!');
}
```

- Và muốn hiển thị log thì phải gọi:

```js
execLogger()()();
```

- Vậy câu lệnh `execLogger()()()()();` gồm 5 lần gọi, thì đặt thế nào?

```js
function execLogger() {// 1
  return  () => // 2
          () => // 3
          () => // 4
          () => // 5
      console.log('Message:', 'Hello World!');
}
execLogger()()()()(); // 5 dấu ()
// Message: Hello World!
```
- Chi tiết ra tường minh sẽ là:

```js
function execLogger() {
  console.log('Lần 1');
  return function lan2() {
    console.log('Lần 2');
    return function lan3() {
      console.log('Lần 3');
      return function lan4() {
        console.log('Lần 4');
        return function lan5() {
          console.log('Message:', 'Hello World!');
        };
      };
    };
  };
}
execLogger()()()()(); // 5 dấu ()
// Lần 1
// Lần 2
// Lần 3
// Lần 4
// Message: Hello World!
```
- Và có thể bỏ đi tên hàm con luôn để thành:

```js
function execLogger() {
  console.log('Lần 1');
  return function () {
    console.log('Lần 2');
    return function () {
      console.log('Lần 3');
      return function () {
        console.log('Lần 4');
        return function () {
          console.log('Message:', 'Hello World!');
        };
      };
    };
  };
}
execLogger()()()()(); // 5 dấu ()
// Lần 1
// Lần 2
// Lần 3
// Lần 4
// Message: Hello World!
```

- Bỏ tiếp chữ function để chuyển qua Arrow Function:

```js
function execLogger() {
  console.log('Lần 1');
  return () => {
    console.log('Lần 2');
    return () => {
      console.log('Lần 3');
      return () => {
        console.log('Lần 4');
        return () => {
          console.log('Message:', 'Hello World!');
        };
      };
    };
  };
}
execLogger()()()()(); // 5 dấu ()
// Lần 1
// Lần 2
// Lần 3
// Lần 4
// Message: Hello World!

```

### 4. doFunc(parameters)

- Truyền giá trị vào function thì sẽ:

```js
const arr = [1,2,3]
function execLogger(a) {
  console.log(a);
  return a;
}
execLogger(1);
// 1
execLogger('Hello World');
// Hello World
execLogger(arr);
// [ 1, 2, 3 ]
```

### 5. doFunc(parameters)()
- Truyền vào giá trị và thực thi thêm 1 lần

```js
const arr = [1, 2, 3];
function execLogger(a) {
  console.log(a);
  return () => {
    console.log('Type: ', typeof a);
    console.log('-------');
  };
}
execLogger(1)();
// 1
// Type:  number

execLogger('Hello World')();
// Hello World  
// Type:  string

execLogger(arr)();
// [ 1, 2, 3 ]  
// Type:  object  
```

### 6. doFunc(callback)
- Truyền vào là một callBack Function

```js
function sum(callback) {
  return callback(1);
}

function execLogger(number) {
  let a = number;
  switch (number) {
    case 1:
      a = 'Một!';
      break;
    case 2:
      a = 'Hai!';
      break;
    case 3:
      a = 'Ba!';
      break;
    default:
      a = 'Không!';
  }
  return console.log('Số:', a);
}

sum(execLogger);
```

### 7. doFunc()(callback)
- Returns