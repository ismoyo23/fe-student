import React, {useState, useEffect} from "react";
import "font-awesome/css/font-awesome.min.css";
import Illustration from "../img/Illustration.png";
import { Row, Col } from "reactstrap";
import signInGoogle from "../img/loginGoogle.png";
import signInFacebook from "../img/loginFacebook.png";
import Or from "../img/or.png";
import styles from "./style.module.css";
import Message from "../img/message.png";
import Password from "../img/password.png";
import Login from "../img/button.png";
import {SignIn} from '../../redux/actions/auth'
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";



let loginPage = (props) => {
  let History = useHistory
  let history = History()
let UseState = useState
 
  
let [username, setUsername] = UseState('');
let [password, setPassword] = UseState('');

let HandleLogin = (event) => {
  event.preventDefault()
  let data = {
    username: username,
    password: password,
    env: process.env.REACT_APP_URL
  }
  props.SignIn(data)
  Swal.fire({
    title: "Welcome",
    text: `Login success, click ok`,
    icon: "success",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.value) {
      history.push('/home')
    }
  });
  

}



 
  return (
    <div style={{ width: "100%", backgroundColor: "#F4F4F4", height: "100vh" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row style={{ marginTop: "7vh" }}>
          <Col xs="12" md="6" sm="12">
            <img style={{ width: "81vh", height: "76vh" }} src={Illustration} />
          </Col>

          <Col
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
            sm="12"
            xs="12"
            md="6"
          >
            <div className={styles.bgLogin}>
              <div>
                <p style={{fontSize: 34, fontWeight: 'bold', color: '#43A1F4', marginLeft: 23}}>Selamat Datang</p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={signInGoogle}
                    style={{
                      width: "69vh",
                      height: "10vh",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={signInFacebook}
                    style={{
                      width: "69vh",
                      height: "10vh",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={Or}
                    style={{
                      width: "66vh",
                      height: "3vh",
                    }}
                  />
                </div>

                {/* form input */}
                <div
                  style={{
                    marginTop: 19,
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#ECECEC",
                      width: "66vh",
                      height: "9vh",
                      borderRadius: 2,
                    }}
                  >
                    <div style={{ marginLeft: 12, marginTop: 6 }}>
                      <p className={styles.titleInput}>Username</p>
                      <div style={{ flexDirection: "row", marginTop: -33 }}>
                        <img
                          style={{
                            width: "3vh",
                            height: "3vh",
                            marginTop: -18,
                          }}
                          src={Message}
                        />
                        <input  value={username} onChange={(e) => setUsername(e.target.value)} className={styles.Input} />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: 19,
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#ECECEC",
                      width: "66vh",
                      height: "9vh",
                      borderRadius: 2,
                    }}
                  >
                  <div style={{ marginLeft: 12, marginTop: 6 }}>
                      <p className={styles.titleInput}>Password</p>
                      <div style={{ flexDirection: "row", marginTop: -33 }}>
                        <img
                          style={{
                            width: "3vh",
                            height: "3vh",
                            marginTop: -18,
                          }}
                          src={Password}
                        />
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className={styles.Input} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* remember me */}
                <div
                  style={{
                    marginLeft: "7vh",
                    marginTop: 3,
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <div style={{ flexDirection: "row" }}>
                    <input type="checkbox" style={{ marginTop: 5 }} />
                    <label className={styles.textRemember}>Remember me</label>
                  </div>

                  <div
                    style={{
                      flexDirection: "row",
                      width: "48vh",
                      marginTop: 12,
                    }}
                  >
                    <p className={styles.textForgot}>Forgot Password?</p>
                  </div>
                </div>
                {/* button login */}
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <a onClick={HandleLogin} href="#">
                    <img style={{ width: "65vh" }} src={Login} />
                  </a>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({

  auth: state.auth,

});
const mapDispatchToProp = {
  //=================================
 SignIn
};

export default connect(mapStateToProps, mapDispatchToProp)(loginPage);
