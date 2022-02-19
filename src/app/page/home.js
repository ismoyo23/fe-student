import React, { useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import { Container, Button, Card, Row, Col, Table } from 'reactstrap';
import styles from './home.module.css';
import CanvasJSReact from "../../canvas/canvasjs.react";
import $ from "jquery";
import { connect } from "react-redux";
import moment from 'moment'
import {SignIn, logout} from '../../redux/actions/auth'
// import action on redux
import { homeGet, homeCountKelas, homeCountJurusan, homeCountTanggal } from "../../redux/actions/home";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";


//==========================================================

let HomePage = (props) => {
    let CanvasJSChart = CanvasJSReact.CanvasJSChart;
    let UseState = useState
    let History = useHistory
    let history = History()

    // state
    let [dateFrom, setDateFrom] = UseState(moment(Date()).format('YYYY-MM-DD'))
    let [dateTo, setDateTo] = UseState(moment(Date()).format('YYYY-MM-DD'))

 
    let [chartKelas, setChartKelas1] = UseState([])
    let [chartTanggal, setChartTanggal1] = UseState([])
    let [chartJurusan, setChartJurusan1] = UseState([])



    let Logout = (event) => {
      event.preventDefault();
      Swal.fire({
        title: "Are you sure?",
        text: "You will exit this page",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            title: "Success",
            text: "Logout Success",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.value) {
              props.logout();
              history.push("/");
            }
          });
        }
      });
    };
    
    // Did Moun
    useEffect(() => {
        $(".buttonClose").show();
        $(".buttonOpen").hide();

        // get data
      getData()
      getCountTanggal()
      getCountKelas()
      getCountTanggal()

     
      if(props.auth.data.username === undefined){
        history.push('/')
      }
    }, []);



    let handleFilter = (event) => {
      event.preventDefault()
    
      getData()
      getCountTanggal()
      getCountKelas()
      getCountJurusan()
    }


    // get data from database
    let getData =() => {
        let data = {
          ConUrl: process.env.REACT_APP_URL,
          token: props.auth.data.AccessToken,
        
        };

       
        props.homeGet(data, dateFrom, dateTo)
    }

    let getCountJurusan = () => {
      let data = {
        ConUrl: process.env.REACT_APP_URL,
        token: props.auth.data.AccessToken,
        date_from: dateFrom,
        date_to: dateTo,
        by: 'nama_jurusan'
      };

      props.homeCountJurusan(data).then((props)=>{
        let store = []
        let d = props.action.payload.data.data
        for (let i = 0; i < d.length; i++) {
          store.push({
            label: d[i].nama_jurusan,
            y: d[i].count,
          });
        }

        setChartJurusan1(store)
      })
    }


    let getCountKelas = () => {
      let data = {
        ConUrl: process.env.REACT_APP_URL,
        token: props.auth.data.AccessToken,
        date_from: dateFrom,
        date_to: dateTo,
        by: 'nama_kelas'
      };
    

      props.homeCountKelas(data).then((props)=>{
        let store = []
        let d = props.action.payload.data.data
        for (let i = 0; i < d.length; i++) {
          store.push({
            lable: d[i].nama_kelas,
            y: d[i].count
          })
        }
       
        setChartKelas1(store)
      })

      
    }

    let getCountTanggal = () => {
      let data = {
        ConUrl: process.env.REACT_APP_URL,
        token: props.auth.data.AccessToken,
        date_from: dateFrom,
        date_to: dateTo,
        by: 'tanggal'
      };

      props.homeCountTanggal(data).then((props)=>{
        let store = []
        let data = props.action.payload.data.data
        for (let i = 0; i < data.length; i++) {
          store.push({
            label: moment(data[i].tanggal).format("DD MMMM YYYY"),
            y: data[i].count,
          });
        }

        setChartTanggal1(store)
      })
    }
    

// option pie
    const optionsPie = {
        animationEnabled: true,
        title: {
            text: "Laporan Perjurusan",
          },
       
        data: [{
          type: "pie",
          startAngle: 75,
          toolTipContent: "<b>{label}</b>: {y}",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - {y}",
          dataPoints: chartJurusan
        }]
      }

      let optionsColumn = {
        animationEnabled: true,
        indexLabel: "{label} - {y}",
        title: {
            text: "Laporan Perkelas",
          },
       
        data: [
          {
            // Change type to "doughnut", "line", "splineArea", etc.
            type: "column",
            dataPoints: chartKelas
          },
        ],
      };


      let optionsLine = {
        animationEnabled: true,
        title: {
            text: "Laporan Harian",
          },
       
        data: [
          {
            // Change type to "doughnut", "line", "splineArea", etc.
            type: "line",
            dataPoints: chartTanggal
          },
        ],
      };

      let closeSideBar = () =>{
        $(".buttonClose").hide();
        $(".buttonOpen").show();

        $(".sideBar").addClass(styles.sideBarClose)
        $(".sideBar").removeClass(styles.sideBarOpen)
      }

      let openSideBar = () => {
        $(".buttonClose").show();
        $(".buttonOpen").hide();

        $(".sideBar").addClass(styles.sideBarOpen)
        $(".sideBar").removeClass(styles.sideBarClose) 
      }
    
    return (
        <>

         {/* navbar */}
         <div style={{ height: 40, width: '100%', position: 'absolute', zIndex: -2}}>
                <Container>
                    <div style={{marginLeft: 'auto',width: 122, display:'flex', marginTop: 2}}>
                        <p style={{fontWeight: 'bold', marginTop: 12}}>Welcome, {props.auth.data.username}</p>
                       
                    </div>
                </Container>
            </div>
            
        <div style={{display: 'flex', width: '100%', height: '100%'}}>
            {/* sidebar */}
            <div className={`${styles.sideBar} sideBar`} style={{display: 'block', overflow: 'auto', width: 260, backgroundColor: '#4116F5'}} >
                <Container>
                    <div className={styles.headerAdmin}>
                        <p className={styles.titleAdmin}>Admin</p>
                        <Button className={`buttonClose`} onClick={closeSideBar} color="link" style={{marginLeft: 'auto'}}><i style={{ color: 'white', fontSize: 24}} className="fa fa-bars" aria-hidden="true"></i></Button>
                        <Button className={`buttonOpen`} onClick={openSideBar} color="link" style={{marginLeft: 'auto'}}><i style={{ color: 'white', fontSize: 24}} className="fa fa-bars" aria-hidden="true"></i></Button>
                        
                    </div>
                   
             
                    <div className={styles.bgMenu}>
                    <p style={{color: 'white'}}>dari tanggal</p>
                        <input value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} style={{borderRadius: 4}} type="date" />
                    </div>
                    <div className={styles.bgMenu}>
                        <p style={{color: 'white'}}>s.d</p>
                    </div>
                    <div className={styles.bgMenu}>
                        <input value={dateTo} onChange={(e) => setDateTo(e.target.value)} style={{borderRadius: 4}} type="date" />
                    </div>
                    <div className={styles.bgMenu}>
                    <Button onClick={handleFilter} color="info">Accept</Button>
                    <a href="#" onClick={Logout} style={{marginLeft:9, position: 'absolute', zIndex: 2}} className="btn btn-danger">Logout</a>
                    </div>
                </Container>
            </div>

            {/* body */}
            <div style={{marginTop: 63, display: 'flex', justifyContent: 'center', width: '100%'}}>
                <Container>
                    <Row className={styles.rowCard}>
                        <Col xs={12} md={4}>
                            <Card body inverse color="primary" style={{ height: 300, width: '50vh'}}>
                                <CanvasJSChart
                                                options={optionsPie}
                                                /* onRef={ref => this.chart = ref} */
                                            />
                            </Card>
                        </Col>

                        <Col xs={12} md={4}>
                            <Card body inverse color="primary" style={{ height: 300, width: '50vh'}}>
                                <CanvasJSChart
                                                options={optionsColumn}
                                                /* onRef={ref => this.chart = ref} */
                                            />
                            </Card>
                        </Col>

                        <Col xs={12} md={4}>
                            <Card body inverse color="primary" style={{ height: 300, width: '50vh'}}>
                                <CanvasJSChart
                                                options={optionsLine}
                                                /* onRef={ref => this.chart = ref} */
                                            />
                            </Card>
                        </Col>
                    </Row>


                    <div style={{height: 400, marginTop: 29, overflow: 'scroll'}}>
                        <Table hover >
                            <thead>
                                <tr>
                                <th>No</th>
                                <th>Nama siswa</th>
                                <th>Kelas</th>
                                <th>Jurusan</th>
                                <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                            {props.dataAbsence.data.map((i, key) => {
                                  return (
                                    <tr>
                                    <td scope="row">{key+1}</td>
                                    <td>{i.nama}</td>
                                    <td>{i.nama_kelas}</td>
                                    <td>{i.nama_jurusan}</td>
                                    <td>{i.status}</td>
                                    </tr>
                                );
                              }
                              )}
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </div>
        </div>
    
        
           
        </>
    )
    
}


const mapStateToProps = (state) => {
return{
  auth: state.auth,
  dataAbsence: state.homeGet,
  countJurusan: state.homeCountJurusan,
  countKelas: state.homeCountKelas,
  countTanggal: state.homeCountTanggal
}
};
const mapDispatchToProp = {
  //=================================
 homeGet, logout, SignIn, homeCountTanggal, homeCountJurusan,homeCountKelas
};

export default connect(mapStateToProps, mapDispatchToProp)(HomePage);