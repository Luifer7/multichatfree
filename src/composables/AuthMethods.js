
import { useDataStore } from "../stores/data"
import { signInWithEmailAndPassword, onAuthStateChanged, 
         signOut, updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection, addDoc, updateDoc } from "firebase/firestore"; 
import { auth, db } from "../firebase";
import Swal from 'sweetalert2'
import { async } from "@firebase/util";


export function useAuth() {

    const useData = useDataStore()

    const userLogin = async (email, password) => {
      useData.spinner = true
      await  signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        const user = userCredential.user
        if (user) {
          useData.spinner = false
          Swal.fire({
            position: 'center',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
        }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (error) {
              useData.spinner = false
              Swal.fire({
                title: errorCode,
                text: errorMessage,
                html:
                `</b class="text-warning"> ${errorMessage} </b>`,
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            }
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
            name: name.toUpperCase(), 
            foto: photo,
            bg: bg,
            estado: 1
          })
          
         getUserData()
        }).catch((error) => { console.log(error)})  
    }



    const userRegister = async (email, password) => {
        useData.spinner = true
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        const user = userCredential.user
        if (user) {
          useData.spinner = false
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario creado correctamente',
            showConfirmButton: false,
            timer: 1500
          })
        }
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message
          if (errorCode) {
            useData.spinner = false
            Swal.fire({
              title: errorCode,
              text: errorMessage,
              html:
              '<b>Formato email:</b> <b class="text-success">ejemplo@ejemplo.com</b> </br> ' +
              '<b>Formato contraseña:</b> <b class="text-success">minimo 6 digitos</b> </b> ',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          }
      })
        
    }

    const getUserData = async () => {
    await onAuthStateChanged(auth, (user) => {
        if (user != null) {
            useData.spinner = false
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Usuario completado!',
              showConfirmButton: false,
              timer: 1500
            })
          
            useData.isLogin = true
            let current = { id: user.uid, token: user.refreshToken, email: user.email, 
            name: user.displayName, foto: user.photoURL, estado: null}
            useData.currentUser = current
        } else { useData.isLogin = false }

      })
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
  