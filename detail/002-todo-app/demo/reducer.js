const init = {
  items: [
    {
      title: 'Learn Javascript',
      completed: true,
    },
    {
      title: 'Learn HTML',
      completed: false,
    },
    {
      title: 'Learn NodeJS',
      completed: true,
    },
  ],
};

export default function reducer(state = init, action, args) {
  switch (action) {
    case 'Add':
      let newItem = {
        title: args[0],
        completed: false
      }
      return {
        ...state,
        items: [...state.items, newItem],
      }
      break;
    default:
      return state;
  }
}
