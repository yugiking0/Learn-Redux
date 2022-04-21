import html from "./core";
import { connect } from "./store";

const connect = connect(state=>({
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
