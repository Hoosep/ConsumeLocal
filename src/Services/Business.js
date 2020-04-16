import firebase from "../fire";

// Utils
import { cleanObject, createSlug,
          makeResponse } from "../Shared/Utils";

const firestore = firebase.firestore();
const auth = firebase.auth();
const businessStorage = firebase.storage();
const businessCollection = firestore.collection("business");

export const BusinessAPI = {
  createBusiness,
  getBusiness,
  getBusinessByCity
};
var actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: 'http://localhost:3000/last-step',
  handleCodeInApp: true,
};

async function createBusiness(data = {}){
  let { business_name, main_img, email } = data;

  let cleanData = cleanObject(data);

  let emailExists = await businessCollection.where("email", "==", email)
  .get()
  .then(querySnapshot => {
    let totalEmail = 0;  
    querySnapshot.forEach(doc => {
      totalEmail = totalEmail + 1;
    });
    if(totalEmail > 0) return true;
    else return false;
  })

  if(emailExists) {
    return {
      type: "error",
      message: "Oh, oh! Un negocio ya ha sido registrado con ese correo electrónico."
    }
  } else {
    /* auth.sendSignInLinkToEmail(email, actionCodeSettings)
    .then(function() {
      window.localStorage.setItem('emailForSignIn', email);
    })
    .catch(function(error) {
      // Some error occurred, you can inspect the code: error.code
    }); */

    let slug = createSlug(business_name);
    data.slug = await businessCollection.where("slug", "==", slug)
    .get()
    .then(querySnapshot => {
      let idx = 0;
      querySnapshot.forEach((doc) => {
        idx = idx + 1;
      });
  
      if(idx > 0){
        return createSlug(`${business_name} ${idx}`)
      } else return slug;
    })
    .catch(error => {
      console.log("Error", error);
    });
  
    if(data.hasOwnProperty('main_img')) {
      data.main_img = await (
        businessStorage
        .ref(`/business/${slug}`).
        putString(main_img, 'data_url').then(async snapshot => {
          console.log("Updated a data_url", snapshot);
          return await snapshot.ref.getDownloadURL().then(downloadUrl => {
            console.log("downloadurl", downloadUrl);
            return downloadUrl;
          });
        })
      );
    }
  
    return await (
      businessCollection
      .doc().set(cleanData)
      .then(function() {
        return {
          type: "success",
          message: "Se creo el negocio correctamente.",
          slug: data.slug
        }
      })
      .catch(function(error) {
        return {
          type: "error",
          message: "Oh, oh! Ha ocurrido un error. Vuelve a intentarlo."
        }
      })
    );
  }

}

async function getBusinessByCity(city){
  let response = [];
  await (
    businessCollection.where("county", "==", city)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          let dataDoc = doc.data();
          response.push({
            id: doc.id,
            ...dataDoc
          });
      });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    })
  );
  return response;
}

async function getBusiness(slug){
  let response = {} ;
  await (
    businessCollection.where("slug", "==", slug)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          response = doc.data();
      });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    })
  );
  return response;
}