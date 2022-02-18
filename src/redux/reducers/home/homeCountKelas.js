let initialState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    data: [],
  };
  
  let homeCountKelas = (state = initialState, action) => {
    switch (action.type) {
      case "DATACOUNTKELAS_PENDING":
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case "DATACOUNTKELAS_REJECTED":
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      case "DATACOUNTKELAS_FULFILLED":
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload.data.data,
        };
      default: {
        return state;
      }
    }
  };
  
  export default homeCountKelas;
  