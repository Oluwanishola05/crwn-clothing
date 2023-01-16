import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';




const config = {
    
        apiKey: "AIzaSyBkBeRHSTEL7wFEuq0B9RdryxhPB_OtJlU",
        authDomain: "crwn-db-d6afc.firebaseapp.com",
        projectId: "crwn-db-d6afc",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
        storageBucket: "crwn-db-d6afc.appspot.com",
        messagingSenderId: "884003652506",
        appId: "1:884003652506:web:fd096faa2ffcca391ef023",
        measurementId: "G-39ML75LB43"
      
};


export const createUserProfileDocument = async (userAuth, additionalData) =>{
        if(!userAuth) return;

        const userRef = firestore.doc(`users/${userAuth.uid}`);
       
        const snapShot = await userRef.get();

        

        
        if(!snapShot.exists){
                const { displayName, email } = userAuth;
                const createdAt = new Date();
                

                try {
                    await userRef.set({
                        displayName,
                        email,
                        createdAt,
                        ...additionalData
                    })    
                } catch (error) {
                      console.log('error creating user', error.message);  
                }
        }

        return userRef;
        
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () =>{auth.signInWithPopup(provider)};

export default firebase;