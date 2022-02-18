let initialState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    data: [],
  };
  
  let homeCountTanggal = (state = initialState, action) => {
    switch (action.type) {
      case "DATACOUNTTANGGAL_PENDING":
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case "DATACOUNTTANGGAL_REJECTED":
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      case "DATACOUNTTANGGAL_FULFILLED":
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
  
  export default homeCountTanggal;