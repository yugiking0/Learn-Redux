// Viết component thay cho dùng: 
// attach(component, root){ // Sẽ đẩy các thành phần component vào root
// attach(() => `<h1>Hello World!!!</h1>`, document.getElementById('root'));

import html from './core.js';

function appComponent(){
  return html`
  <h1>HELLO WORLD</h1>
  `;
}

export default appComponent;
