## Declarative

React giúp tạo các UI tương tác một cách dễ dàng. Thiết kế các khung nhìn đơn giản cho từng trạng thái trong ứng dụng của bạn, và React sẽ cập nhật và render đúng các thành phần phù hợp khi dữ liệu của bạn thay đổi.

Việc khai báo các khung nhìn tường minh sẽ khiến cho mã của bạn dễ sử dụng hơn và dễ dàng gỡ lỗi hơn.

## Component-Based

Xây dựng các component và quản lý các trạng thái của riêng chúng, sau đó kết hợp chúng để tạo các UI phức tạp.

Vì component logic được viết bằng JavaScript thay vì các template, bạn có thể dễ dàng truyền dữ liệu đa dạng qua ứng dụng của mình và tránh thao tác với DOM.

## Learn Once, Write Anywhere

Chúng tôi không đưa ra các giả định về phần kĩ năng công nghệ của bạn, vì vậy bạn có thể phát triển các tính năng mới trong React mà không cần viết lại mã hiện có.

React cũng có thể render trên máy chủ bằng Node và xây dựng ứng dụng di động bằng cách sử dụng React Native.

---

## Các ví dụ

### Ví dụ Component

Các React component thực hiện một phương thức render () lấy dữ liệu đầu vào và trả về những gì sẽ hiển thị. Ví dụ này sử dụng cú pháp giống như XML có tên là JSX. Dữ liệu đầu vào được truyền vào component có thể được truy cập bằng render () qua this.props.

JSX là tùy chọn và không bắt buộc khi sử dụng React. Hãy thử Babel REPL để xem mã JavaScript ban đầu được tạo bởi bước biên dịch JSX.

```jsx
class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Xin chào {this.props.name}
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="Taylor" />,
  document.getElementById('hello-example')
);
```
>KẾT QUẢ
>Xin chào Taylor

### A Stateful Component

Ngoài việc lấy dữ liệu đầu vào (được truy cập qua this.props), một component có thể duy trì dữ liệu trạng thái bên trong (được truy cập qua this.state). Khi dữ liệu trạng thái của một component thay đổi, giao diện sẽ được cập nhật bằng cách tự gọi lại render ().

```jsx
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  tick() {
    this.setState(state => ({
      seconds: state.seconds + 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        Giây: {this.state.seconds}
      </div>
    );
  }
}

ReactDOM.render(
  <Timer />,
  document.getElementById('timer-example')
);
```
>KẾT QUẢ
>Giây: 441

### Một ứng dụng

Chúng ta có thể sử dụng kết hợp props vàstate cho một ứng dụng Todo nhỏ. Ví dụ này sử dụng state để theo dõi danh sách các mục hiện tại cũng như văn bản mà người dùng đã nhập. Mặc dù các trình xử lý sự kiện được hiển thị cùng dòng, chúng sẽ được thu thập và triển khai bằng cách sử dụng các sự kiện.

```jsx
class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <h3>Danh sách công việc</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            Bạn cần làm gì?
          </label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Thêm #{this.state.items.length + 1}
          </button>
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}

ReactDOM.render(
  <TodoApp />,
  document.getElementById('todos-example')
);
```
