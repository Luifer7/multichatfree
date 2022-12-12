
import { useDataStore } from "../stores/data"
import { signInWithEmailAndPassword, onAuthStateChanged, 
         signOut, updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
         
import { doc, setDoc, collection, addDoc, updateDoc } from "firebase/firestore"; 
import { auth, db } from "../firebase";
import Swal from 'sweetalert2'
import { useFormat } from "./FormatDay";
import { useRouter } from "vue-router";




export function useAuth() {

    const useData = useDataStore()
    const { formatCurrentUser } = useFormat()
    const router = useRouter()

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
           router.push('/')
          }).catch((error) => {
          
          })
        
    }




    //Actualiza y crea el usuario
    const editUser = async (username, user) => {

        await updateProfile(auth.currentUser, {
              displayName: username, 
              photoURL: "https://cutewallpaper.org/24/profile-icon-png/png-file-profile-icon-vector-png-transparent-png-980x980-free-download-on-nicepng.png"
          }).then(() => {

          const docRef = addDoc(collection(db, "usuarios"), {
          id: user.uid, token: user.refreshToken, email: user.email, name: username, 
          foto: "https://cutewallpaper.org/24/profile-icon-png/png-file-profile-icon-vector-png-transparent-png-980x980-free-download-on-nicepng.png",
          estado: 1,
          idDocument: 'nn'
        }).then((result) => {
            //Actualizo el user de una
            const currentUserRef = doc(db, "usuarios", result.id);
            updateDoc(currentUserRef, {
              idDocument: result.id
            })
        })
        }).catch((error) => { console.log(error)})  

       

        await anotherObserver()

    }

    // Observer alternativo
    const anotherObserver =  () => {

      onAuthStateChanged(auth, (user) => {
        if (user != null) {
          useData.isLogin = true;
          let current = {
            id: user.uid, token: user.refreshToken, email: user.email,
            name: user.displayName, foto: user.photoURL, estado: null
          };

          useData.currentUser = current;
          useData.alternativeData = user;



        } else {
          useData.isLogin = false;
        }

      })
    }


    const userRegister = async (email, password, username) => {
        useData.spinner = true
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        const user = userCredential.user
    
        if (user) {
          
          editUser(username, user)
          
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


    // Observer
    onAuthStateChanged(auth, (user) => {
        if (user != null) {
            useData.isLogin = true

            let current = 
            { id: user.uid, token: user.refreshToken, email: user.email, 
            name: user.displayName, foto: user.photoURL, estado: null}

            useData.currentUser = current
             formatCurrentUser(user) 
             
          } else { 
          useData.isLogin = false 
        }

      })

     

    return { userLogin, userLogout, editUser, userRegister }
  }
  