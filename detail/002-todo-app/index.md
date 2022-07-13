# Sử dụng thư viện viết Todo App

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

## 1. Chuẩn bị

- file thư viện : core.js
- Các file:

  - index.html
  - store.js
  - reducer.js
  - script.js

  [Chuẩn bị](./detail/chuanbi.md)

## 2. Lấy file giao diện

- Tìm Todo App Template của Klerith github ở link: [TODO Template](https://github.com/Klerith/TODO-CSS-Template)

- Có giao diện như sau:
  ![TODO App](./images/todo-app.png 'TODO App')

[Xử lý Template](./detail/template.md)

### 2.1 Lấy html

- Lấy file index.html lưu thành file temp.html để tham khảo và copy components ở bước sau. [temp.html](./demo/temp.html 'temp.html')

### 2.2 Lấy CSS

- Chỉ lấy 2 file:
  - `index.css` ở link `TODO-CSS-Template/node_modules/todomvc-app-css/index.css` đổi tên thành **style.css**
  - `base.css` ở link `TODO-CSS-Template/node_modules/todomvc-common/base.css` đổi tên thành **base.css**
  - Lưu ở folder css

### 2.3 Điều chỉnh khai báo

- Khai báo lại file index.html lại

- [Khai báo lại file index.html](./detail/xulyIndex.md)

## 3. Xử lý tách Components

- Việc chia giao diện thành các thành phần khác nhau, sau đó xử lý các chức năng của thành phần đó.

  ![Components](./images/components.png 'Components')

- Ở đây ta chia giao diện Todo App thành các thành phần:
  - Phần header
  - Phần main
    - Các item hoàn thành
    - Các item đang thực hiện
  - Phần footer

- [Xử lý tách Components](./detail/components.md)

## 4. Xem các mô tả xử lý
- Ở Header: Gõ vào Enter sẽ được thêm mới Task Todo
  - Sẽ có mũi tên xuống để chọn tất cả, bỏ chọn để xử lý tất cả Task Todo Item hoàn thành hay đang thực hiện.
- Main: Sẽ thể hiện render các Task Todo đã hoàn thành hoặc đang thực hiện.
  - Có ô tích tròn thể hiện đã hoàn thành hay chưa? Có thể tích vào để thay đổi trạng thái.
  - Kích doubled vào một Item Task để sửa lại nội dung, enter hay kích ra ngoài sẽ ghi nhận thay đổi.
- Footer: Có đếm số lượng Item đang thể hiện.
  - All: Thể hiện tất cả đã hoàn thành hoặc đang thực hiện.
  - Active: Filter chỉ thể hiện các Task đang thực hiện(Chưa hoàn thành)
  - Completed: Filter chỉ thể hiện các Task đã hoàn thành.
  - Clear Completed: Chức năng xóa những Task đã hoàn thành. Nếu ban đầu Main không có Task nào hoàn thành thì sẽ ẩn nút đó đi.
## 5. Chức năng
- Các chức năng xử lý như: 
  - Hiển thị các Task ban đầu
  - Lưu Task data vào trong Storage của hệ thống
  - Thêm task mới
  - Thay đổi trạng thái hoàn thành Task
  - Chỉnh sửa nội dung Task
  - Đếm số lượng Task
  - Filter các Task theo trạng thái
  - Xóa các Task đã hoàn thành

- Xem chi tiết xử lý ở: 

[Xử lý chức năng](./detail/chucnang.md 'Xử lý chức năng')


## 6. Hoàn thiện
