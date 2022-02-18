let initialState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    data: [],
  };
  
  let homeCountKelas = (state = initialState, action) => {
    switch (action.type) {
      case "DATACOUNTJURUSAN_PENDING":
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case "DATACOUNTJURUSAN_REJECTED":
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      case "DATACOUNTJURUSAN_FULFILLED":
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