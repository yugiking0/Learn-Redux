// core.js LIBRARY
function html([first, ...strings], ...values) {
  return values
    .reduce((acc, cur) => acc.concat(cur, strings.shift()), [first])
    .filter((x) => (x && x !== true) || x === 0)
    .join('');
}

function createStore(dataAndAction) {
  let state = dataAndAction();

  const roots = new Map();
  function render() {
    for (const [root, component] of roots) {
      const output = component();
      root.innerHTML = output;
    }
  }

  return {
    // enter action from user: add, edit, delete...
    dispatch(action, ...args) {
      state = reducer(state, action, args);
      render();
    },

    // get data, action and use action to process data
    connect: function connect(
      selector = function selector(state) {
        return state;
      }
    ) {
      return function (component) {
        return function (props, ...args) {
          return component(Object.assign({}, props, selector(state), ...args));
        };
      };
    },

    // display data to user-interface
    attach(component, root) {
      roots.set(root, component);
      render();
    },
  };
}

// DATA
const init = {
  cars: ['BMW', 'KIA'],
};

// reducer.js getDATA and createACTIONs
function reducer(state = init, action, args) {
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

// store.js USING LIBRARY
const { attach, connect, dispatch } = createStore(reducer);
window.dispatch = dispatch;

// Cycle: dispatch -> connect -> attach -> dispatch -> connect -> ...

// App.js
var App = connect()(
  // using connect, explaining role of connect here

  function ({ cars }) {
    // using html
    return html`
      <ul>
        ${cars.map((car) => `<li>${car}</li>`)}
      </ul>
      <button onclick="dispatch('ADD', 'PORSCHE')">Add car</button>
    `;
    // using dispatch-global
  }
);

// script.js
attach(App, document.getElementById('root')); // using attach

// THE END
// Good luck! You can do it :D
