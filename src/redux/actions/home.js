import axios from "axios";

// ==============================================
// action get data Author
export let homeGet = (data, dateFrom, dateTo) => ({
  type: "HOME",
  payload: axios({
    method: "GET",
    url: `${data.ConUrl}home?date_from=${dateFrom}&date_to=${dateTo}`,
    headers: {
      'Authorization': data.token
    } 
  }),
});


export let homeCountKelas = (data) => ({
  type: "DATACOUNTKELAS",
  payload: axios({
    method: "GET",
    url: `${data.ConUrl}home/reportabsence?date_from=${data.date_from}&date_to=${data.date_to}&by=${data.by}`,
    headers: {
      'Authorization': data.token
    } 
  }),
})

export let homeCountJurusan = (data) => ({
  type: "DATACOUNTJURUSAN",
  payload: axios({
    method: "GET",
    url: `${data.ConUrl}home/reportabsence?date_from=${data.date_from}&date_to=${data.date_to}&by=${data.by}`,
    headers: {
      'Authorization': data.token
    } 
  }),
})

export let homeCountTanggal = (data) => ({
  type: "DATACOUNTTANGGAL",
  payload: axios({
    method: "GET",
    url: `${data.ConUrl}home/reportabsence?date_from=${data.date_from}&date_to=${data.date_to}&by=${data.by}`,
    headers: {
      'Authorization': data.token
    } 
  }),
})