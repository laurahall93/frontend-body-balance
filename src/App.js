import { useState, useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import MainBody from "./MainBody";

const firebaseConfig = {
  apiKey: "AIzaSyDtDztkLUrzoYYBt4-xwmpVxfWcvKrNwhg",
  authDomain: "body-balance-e2.firebaseapp.com",
  projectId: "body-balance-e2",
  storageBucket: "body-balance-e2.appspot.com",
  messagingSenderId: "585060853507",
  appId: "1:585060853507:web:01282ea8d62f7e90766b36",
  measurementId: "G-F5SBYKJ4VN",
};

firebase.initializeApp(firebaseConfig);

// Configure FirebaseUI.
const uiConfig = {
  signInFlow: "popup",
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <div>
        <h1>Body & Balance</h1>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }

  return (
    <>
      <MainBody />
    </>
  );
}

export default App;
