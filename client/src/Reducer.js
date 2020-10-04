const Reducer = (state, action) => {
  switch (action.type) {
      case 'ADD_PAGE':
          return {
              ...state,
              pages: [...state.pages, action.payload]
          };
      case 'SET_QUERY':
        return {
          ...state,
          query: action.payload
        }
      default:
          return state;
  }
};

export default Reducer;