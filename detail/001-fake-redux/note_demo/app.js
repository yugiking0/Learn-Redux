import html from "./core.js";
import { connect } from "./store.js";

const connector = connect(state=>({
  car: state.car[0],
  cars: state.cars
}));

function app({pops}){
  return html `
  <ul>
    ${cars.map(car=>`<li>${car}</li>`)}
  </ul>
  `
}

export default connector(app)