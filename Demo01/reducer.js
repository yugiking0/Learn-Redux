var init = {
  cars: ['toyota', 'honda', 'porsche'],
};

export default function reducer(action, state = init, ...args) {
  console.log(action);
  switch (action) {

    case 'ADD': // action add, edit, delete...
      let [newCar] = args;
      return {
        cars: [...state.cars, newCar],
      };
      break;
    case 'DEL': // action add, edit, delete...
      const index = args[0]
      console.log('args::', index,state);
      if (index > -1) {
        state.cars.splice(index, 1); // 2nd parameter means remove one item only
      }
      return state;
      break;
    default:
      return state;
  }
}
