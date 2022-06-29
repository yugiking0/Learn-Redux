import html from './core.js';
import { connect } from './store.js';
const connector = connect();

function app(props) {
  console.log('props::', props);
  return html`
  <label>Car:</label>
  <input id = "element-Car"></input>
  <button onClick = "dispatch('ADD', document.getElementById('element-Car').value)">Add</button>
  <ul>
    ${props.cars.map((car, index) => 
      `<li>
        <div>${car}</div> 
        <button onClick = "dispatch('DEL', ${index})">Xóa</button>
        <button onClick = "dispatch('EDIT', ${index})">Sửa</button>
      </li>`)}
  </ul>
  `;
}

export default connector(app);
