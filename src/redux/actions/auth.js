import axios from "axios";

export const SignIn = (data) => ({
  type: "LOGIN",
  payload: axios({
    method: "POST",
    url: `${data.env}auth/login`,
    data: {
      username: data.username,
      password: data.password
    },
  }),
});

export let logout = () => {
  return {
    type: "LOGOUT",
  };
};

export let user = (data) => ({
  type: "USER",
  payload: axios({
    method: "GET",
    url: `${data.ConUrl}books/absence/get${data.Search}`,
  }),
});
