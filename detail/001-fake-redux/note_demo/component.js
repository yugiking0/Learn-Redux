// Viết component thay cho dùng:
// attach(component, root){ // Sẽ đẩy các thành phần component vào root
// attach(() => `<h1>Hello World!!!</h1>`, document.getElementById('root'));
import html from './core.js';
import { connect } from './store.js';

// const connector = connect(state=>({
//   car: state.car[0],
//   cars: state.cars
// }));

const connector = connect();

function appComponent(props) {
  console.log('props::', props);
  return html`
    <h1>Todo App</h1>
    <ul>
      ${props.cars.map((car,index) => `<li>${car} <button onClick = "dispatch('DEL', '${index}')" >Xóa</button> </li>`)}
    </ul>
    <button onClick= "dispatch('ADD','DuyDQ')" >Thêm</button>
  `;
}


export default connector(appComponent);
