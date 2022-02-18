import { combineReducers } from "redux";
// =============================================
// import from reducers auth
import auth from "./auth";

// =============================================
// import funtion from author
import homeGet from "./home/homeGet";
import homeCountKelas from './home/homeCountKelas'
import homeCountJurusan from './home/homeCountKelas'
import homeCountTanggal from './home/homeCountKelas'


import user from "./users/userGet";

import 'bootstrap/dist/css/bootstrap.min.css';

// export combine reducers
export default combineReducers({
  // =========================================//
  // export auth //
  auth,
  user,
  // =========================================//
  // export home //
 homeGet,
 homeCountKelas,
 homeCountJurusan,
 homeCountTanggal
});
