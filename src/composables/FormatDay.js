


import { useDataStore } from "../stores/data"
import  format  from 'date-fns/format'
import formatDistance from "date-fns/formatDistance";
import subDays from "date-fns/subDays";
import Swal from 'sweetalert2'
import { auth, db } from "../firebase";
import { updateProfile, onAuthStateChanged } from "firebase/auth";

export function useFormat() {

    const useData = useDataStore()
   

    
    const formatCurrentUser = async (data) => {

        const justNow = new Date()
        useData.alternativeData = {}

        let created = Math.floor(data?.metadata?.createdAt)
        let lastLoginAt = Math.floor(data?.metadata?.lastLoginAt)

        useData.alternativeData = 
            {
                created: formatDistance(created, justNow),
                createdTime: data.metadata.creationTime,
                lastLoginAt: formatDistance(lastLoginAt, justNow),
                lastSignInTime: data?.metadata?.lastSignInTime
            }

    }


    // MODAL EDITAR IMAGEN
    const ModalEditPhoto = async  () => {

        const { value: url } = await Swal.fire({
            input: 'url',
            inputLabel: 'URL de  la imagen',
            inputPlaceholder: 'Copia la URL',
            showCancelButton: true
          })
          
          if (url) {
            Swal.fire({
                imageUrl: `${url}`,
                imageWidth: 300,
                imageHeight: 200,
                text: 'Quieres agregar esta imagen?',
                imageAlt: 'URl no disponible',
                showConfirmButton: true,
                showDenyButton: true,
            }).then((result) => {
                if (result.isDenied) {
                    Swal.fire({
                        icon: 'error',
                        title: 'La imagen no fue cambiada!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                if (result.isConfirmed) {
                    editPhoto(url)
                    Swal.fire({
                        icon: 'success',
                        title: 'Tu imagen fue cambiada!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            
              })

          }
    }

    //Edit IMAGEN METHOD
   const editPhoto = async (url) => {
    await updateProfile(auth.currentUser, {
        photoURL: url
    }).then(() => {
        
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

    }).catch((error) => {console.log(error)})  
}


    return {
        formatCurrentUser, ModalEditPhoto
    }
}