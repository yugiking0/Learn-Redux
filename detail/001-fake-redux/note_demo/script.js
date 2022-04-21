import { attach } from './store.js'; // Lấy dữ liệu từ store ra VIEW

// attach(component, root){ // Sẽ đẩy các thành phần component vào root
// attach(() => `<h1>Hello World!!!</h1>`, document.getElementById('root'));

import appComponent from './component.js';
const app = appComponent;

attach(appComponent, document.getElementById('root'));
// attach(app, document.getElementById('root'));