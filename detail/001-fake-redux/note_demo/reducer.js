const init = {
  cars: ['BMW'],
};

export default function reducer(state = init, action, args) {
  switch (action) {
    case 'ADD': // action add, edit, delete...
      const [newCar] = args;
      return {
        cars: [...state.cars, newCar],
      };
    default:
      return state;
  }
}
