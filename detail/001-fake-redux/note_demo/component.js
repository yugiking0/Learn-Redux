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
    <ul>
      ${props.cars.map((car) => `<li>${car}</li>`)}
    </ul>
    <button onclick="dispatch('ADD', 'PORSCHE')">Add car</button>
  `;
}
export default connector(appComponent);
