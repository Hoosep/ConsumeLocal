import axios from 'axios';
import { STATES } from "./States";

import db from "../fire";

export const CommonAPI = {
  getStates,
  getCounties,
  getCategories,
  getSubcategory
};

const PUBLIC_API = "https://raw.githubusercontent.com/";

async function getStates(){
  return STATES;
}

async function getCounties(keyCounty){
  return axios({
    method: 'GET',
    url: `${PUBLIC_API}martinciscap/json-estados-municipios-mexico/master/estados-municipios.json`
  }).then((response) => {
    let { data } = response;

    const filtered = Object.keys(data)
      .filter(key => key === keyCounty)
      .map(item => data[item]);

    let newResponse = [];
    for (let index = 0; index < filtered[0].length; index++) {
      const county = filtered[0][index];

      newResponse.push({
        id: index,
        name: county
      }); 
    }

    return newResponse;
  }, error => {
    console.log(error);
  });
}

async function getCategories(){
  let response = [];
  await db.firestore().collection("category").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      let dataDoc = doc.data();
      response.push({
        id: doc.id,
        name: dataDoc.name
      })
    });
  });
  return response;
}

async function getSubcategory(categoryID = "DwJsvvIxUHXOzPaHtopy"){
  console.log("category", categoryID);
  let response = [];
  await db.firestore()
        .collection(`category/${categoryID}/subcategory`)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach((doc) => {
            let dataDoc = doc.data();
            response.push({
              id: doc.id,
              name: dataDoc.name
            })
          });
        });
  return response;
}