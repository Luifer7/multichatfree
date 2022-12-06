
import { useDataStore } from "../stores/data"
import { signInWithEmailAndPassword, onAuthStateChanged, 
         signOut, updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection, addDoc, updateDoc } from "firebase/firestore"; 
import { auth, db } from "../firebase";


export function useAuth() {

    const useData = useDataStore()

    const userLogin = async (email, password) => {
      
      await  signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        const user = userCredential.user
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })
    }

    const userLogout = async () => {
       await signOut(auth).then(() => {
           useData.currentUser = null
          }).catch((error) => {
          
          });
    }

    const editUser = async (name, photo, bg, us) => {
        await updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
          }).then(() => {
        
            const docRef = addDoc(collection(db, "usuarios"), {
            id: us.id, 
            token: us.token, 
            email: us.email, 
            name: name, 
            foto: photo,
            bg: bg,
            estado: null
          })

        }).catch((error) => { console.log(error)})  
    }

    const userRegister = async (email, password) => {
        
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        const user = userCredential.user
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message})
   
    }

    onAuthStateChanged(auth, (user) => {
        if (user != null) {
            useData.isLogin = true
            let current = { id: user.uid, token: user.refreshToken, email: user.email, 
            name: user.displayName, foto: user.photoURL, estado: null}
            useData.currentUser = current
        } else { useData.isLogin = false }

      })
    
    return { userLogin, userLogout, editUser, userRegister }
  }
  