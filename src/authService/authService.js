import axios from "axios";
import { baseUrl } from "./baseUrl";

// export const get = (route) => {

//     let token = localStorage.getItem('authToken')

//     axios.get(baseUrl + route, {headers: { Authorization: `Bearer ${token}`}})
//     .then((results) =>{
//         console.log(results.data)
//         return results.data
//     })
//     .catch((err) => {
//         console.log('Something went wrong', err.message)
//     })
    
// }

export const get = (route) => {
    let token = localStorage.getItem("authToken");
  
    return axios.get(baseUrl + route, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  

export const post = (route, body) => {

    let token = localStorage.getItem('authToken')

    return axios.post(baseUrl + route, body, {headers: { Authorization: `Bearer ${token}`}})
  
}

// export const postPhoto = (route, body) => {

//     let token = localStorage.getItem('authToken')

//     return axios.post(baseUrl + route, body, {headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data"}})
  
// }

// export const signup = (body) => {
//     post('/users/signup', body)
//     .then((token) =>{
//         console.log(results.data)
//         return results.data
//     })
//     .catch((err) => {
//         console.log('Something went wrong', err.message)
//     })
// }