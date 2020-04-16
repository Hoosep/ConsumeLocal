import firebase from "../fire";

// Utils
import { cleanObject, createSlug,
          makeResponse } from "../Shared/Utils";

const firestore = firebase.firestore();
const auth = firebase.auth();


export const UserAPI = {
  getAuth
};

async function getAuth(){
  // Confirm the link is a sign-in with email link.
  if (auth.isSignInWithEmailLink(window.location.href)) {
    var email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      email = window.prompt('Please provide your email for confirmation');
    }
    return await auth.signInWithEmailLink(email, window.location.href)
      .then(function(result) {
        console.log("res", result);
        console.log(auth.currentUser);
        // Clear email from storage.
        window.localStorage.removeItem('emailForSignIn');
        return {
          type: "SET_PASSWORD"
        }
      })
      .catch(async error => {
        return await auth.sendSignInLinkToEmail(email, {
          url: 'http://localhost:3000/last-step',
          handleCodeInApp: true,
        }).then(() => {
          window.localStorage.setItem('emailForSignIn', email);
          return {
            type: "RESEND_LINK"
          }
        }).catch(error => {

        });
      });
  }
}