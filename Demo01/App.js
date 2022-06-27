import html from './core.js';
import { connect } from './store.js';

const connector = connect();

function App(props) {
  return html`
    <h1>Todo App</h1>
    <ul>
      ${props.cars.map((car,index) => `<li>${car} <button onClick = "dispatch('DEL', '${index}')" >Xóa</button> </li>`)}
    </ul>
    <button onClick= "dispatch('ADD','DuyDQ')" >Thêm</button>
  `;
}

export default connector(App);
