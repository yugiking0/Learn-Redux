import { attach } from './store.js'; // Lấy dữ liệu từ store ra VIEW
import doApp from './component.js';
// attach(component, root){ // Sẽ đẩy các thành phần component vào root
// attach(() => `<h1>Hello World!!!</h1>`, document.getElementById('root'));

attach(doApp, document.getElementById('root'));
