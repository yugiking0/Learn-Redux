export default function html([first, ...values],...strings){
  return strings.reduce((acc,cur) => {
    return acc.concat(cur,values.shift());
  }, [first])
  .filter(x => x && x !== true || x === 0)
  .join('');
}

/**
 * //==========Sai làm cho render sai===============
export default function html([first, ...values],...strings){
  return values.reduce((acc,cur) => {
    return acc.concat(cur,strings.shift());
  }, [first])
  .filter(x => x && x !== true || x === 0)
  .join('');
}
 */

export function createStore(reducer){
  let state = reducer();
  let roots = new Map();

  function render(){
    for(const [root, component] of roots){
      let output = component();
      root.innerHTML = output;
    }
  }

  return {
    attach(component, root){
      roots.set(root,component);
      render();
    },

    connect(selector = state => state){
      return component => (props, args) => component(Object.assign({}, props, selector(state), args))
    },

    dispatch(action, ...args) {
      state = reducer(state, action, args);
      render();
    }
  }
}