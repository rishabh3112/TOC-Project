const Reducer = (state, action) => {
  switch (action.type) {
      case 'ADD_PAGE':
          return {
              ...state,
              pages: [...state.pages, action.payload]
          };
      default:
          return state;
  }
};

export default Reducer;