let init = {
  cars: ['BMW', 'Porsche', 'Mercedes'],
};

export default function reducer(state = init, action, ...args) {
  switch (action) {
    case 'DEL': {
      let [index] = args[0];
      console.log(index);
      if (index > -1) {
        state.cars.splice(index, 1);
      }
      return state;
    }
    case 'ADD':
      let newCar = args[0];
      if (newCar[0].length > 0) {
        return {
          cars: [...state.cars, ...newCar],
        };
      }
      return state;
      break;
    default:
      return state;
  }
}
